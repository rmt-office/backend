import z from 'zod'

export const createUserSchema = z.object({
	body: z
		.object({
			username: z.string().optional(),
			email: z.string().email(),
			password: z
				.string()
				.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
					message:
						'Please use a password with at least eight characters, one upper case, lower case, one number and one special character',
				}),
			confirmPassword: z.string(),
		})
		.refine(data => data.password === data.confirmPassword, {
			message: `The passwords don't match`,
		})
		.transform(data => {
			if (!data.username) {
				data.username = data.email.split('@')[0]
			}
		}),
})

export const loginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
			message:
				'Please use a password with at least eight characters, one upper case, lower case, one number and one special character',
		}),
	}),
})
