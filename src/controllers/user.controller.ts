import userServices from '../services/User.service';
import {
	checkEmailInput,
	checkPasswordInput,
	checkUsernameForUpdate,
	validateLogin,
} from '../utils/checkUserInfo';
import { createError, throwError } from '../utils/throwError';
import { RouteProps } from '../utils/types';
import { hashPassword, validatePassword } from '../utils/passwordHandlers';
import { createToken, verifyToken } from '../utils/tokenHandler';
import { sendMail } from '../utils/nodemailer';
import { NewUser, User, UserInfer, UserModel } from '../models/User.model';

type InputType = {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
};
class UserController {
	async signup(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { email, password }: InputType = req.body;
		let { username }: InputType = req.body;
		try {
			const userFromDB = await userServices.getOneUser({ $or: [{ email }, { username }] });
			if (userFromDB) {
				const error = createError('Username and/or email already in use', 400);
				throwError(error);
			}

			const passwordHash = await hashPassword(password);

			const payload = {
				iss: 'email verification',
			};

			const verificationToken = createToken(payload, '15min');
			if (!username) {
				username = email.split('@')[0]
			}

			const createdUser = await userServices.createUser({
				username,
				email,
				password: passwordHash,
				verificationToken,
			});
			const newUser: NewUser = createdUser.toObject();

			delete newUser.password;

			await sendMail(email, verificationToken);

			res.status(201).json(newUser);
		} catch (error: any) {
			error.place = 'Sign up';
			next(error);
		}
	}

	async login(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { email, password } = req.body;

		try {
			const userFromDB = await userServices.getOneUser({ email });
			await validateLogin(userFromDB, password);

			const userObject: NewUser = userFromDB!.toObject();
			if (userObject) {
				delete userObject.password;

				const payload = {
					_id: userObject._id!,
				};

				const token = createToken(payload, '24h');

				res.status(200).json({ token });
			}
		} catch (error: any) {
			error.place = 'Login';
			next(error);
		}
	}

	async verify(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const { _id } = req.payload!;
			const userFromDB = await userServices.getOneUser({ _id });
			if (!userFromDB) {
				const error = createError('User not found', 400);
				throw error;
			}
			const userInfo = {
				_id: userFromDB._id.toString(),
				email: userFromDB.email,
				username: userFromDB.username,
				profilePicture: userFromDB.profilePicture,
				favorites: userFromDB.favorites,
			};
			res.status(200).json(userInfo);
		} catch (error: any) {
			error.place = 'Verify';
			next(error);
		}
	}

	async emailVerification(
		req: RouteProps['req'],
		res: RouteProps['res'],
		next: RouteProps['next']
	) {
		const { verificationToken } = req.params;
		let user;
		try {
			user = await userServices.getOneUser({ verificationToken });
			verifyToken(verificationToken);
			const updateVerify = {
				filter: {
					verificationToken,
				},
				infoUpdate: {
					isVerified: true,
					verificationToken: undefined,
				},
				options: {
					new: true,
				},
			};
			await userServices.findOneAndUpdate(updateVerify);

			res.status(200).json({ message: 'Your email was successfully verified' });
			// TODO: send welcome email
		} catch (error: any) {
			error.place = 'Email verification';
			if (user) {
				error.details = { id: user._id.toString() };
			}
			next(error);
		}
	}

	async createAltToken(
		req: RouteProps['payload'],
		res: RouteProps['res'],
		next: RouteProps['next']
	) {
		const { _id } = req.params;

		try {
			const payload = {
				iss: 'verification',
			};

			const verificationToken = createToken(payload, '15min');

			const updateVerify = {
				filter: {
					_id,
				},
				infoUpdate: {
					verificationToken,
				},
				options: {
					new: true,
				},
			};
			const user = await userServices.findOneAndUpdate(updateVerify);

			await sendMail(user!.email, verificationToken);

			return res.status(200).json({ message: 'New email token created successfully' });
		} catch (error: any) {
			error.place = 'Creating new token';
			next(error);
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { username, email, password, confirmPassword, currentPassword } = req.body;
		try {
			const user = await userServices.getOneUser({ _id: req.payload!._id });
			// TODO: [4] change to a save function
			let updatedUser;

			if (user) {
				if (password) {
					const validChanges = await validatePassword(currentPassword, user.password);

					if (!validChanges) {
						const error = createError('Invalid credentials', 400);
						throwError(error);
					}

					checkPasswordInput(password, confirmPassword);

					const newPassword = await hashPassword(password);
					updatedUser = await userServices.findOneAndUpdate({
						filter: { _id: req.payload!._id },
						infoUpdate: { password: newPassword },
						options: { new: true, runValidators: true, fields: '-password' },
					});
				}

				if (email) {
					const validChanges = await validatePassword(currentPassword, user.password);

					if (!validChanges) {
						const error = createError('Invalid credentials', 400);
						throwError(error);
					}

					checkEmailInput(email);
					const newInfo = { username, email };

					let newUpdatableDate = checkUsernameForUpdate(user, username);

					updatedUser = await userServices.findOneAndUpdate({
						filter: { _id: req.payload!._id },
						infoUpdate: { ...newInfo, canUpdateOn: newUpdatableDate },
						options: { new: true, runValidators: true, fields: '-password' },
					});
				}

				const userInfo = {
					_id: updatedUser!._id.toString(),
					email: updatedUser!.email,
					username: updatedUser!.username,
					profilePicture: updatedUser!.profilePicture,
					favorites: updatedUser!.favorites,
				};

				res.status(200).json(userInfo);
			}
		} catch (error: any) {
			error.place = 'Update user';
			next(error);
		}
	}

	async updatePhoto(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { _id } = req.payload!;
		const { profilePicture } = req.body;

		try {
			if (!profilePicture) {
				const error = createError('You must send a picture url', 400);
				throwError(error);
			}

			const updatedUser = await userServices.findOneAndUpdate({
				filter: { _id: _id },
				infoUpdate: { profilePicture },
				options: { new: true, fields: '-password' },
			});

			res.status(200).json(updatedUser);
		} catch (error: any) {
			error.place = 'Profile photo update';
			next(error);
		}
	}

	async updateFavorites(
		req: RouteProps['payload'],
		res: RouteProps['res'],
		next: RouteProps['next']
	) {
		// TODO: Implement update favorites after places are created
	}

	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const user = await userServices.deleteOne({ _id: req.payload!._id });
			if (user === null) {
				const error = createError('User already deleted', 400);
				throwError(error);
			}
			res.status(204).json();
		} catch (error: any) {
			error.place = 'Delete user';
			next(error);
		}
	}
}

export default new UserController();
