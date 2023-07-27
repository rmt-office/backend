import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
	const passwordHash = await bcrypt.hash(password, 12)

	return passwordHash
}

export const validatePassword = async (passwordCandidate: string, passwordEncrypted: string) => {
	const passwordVerify = await bcrypt.compare(passwordCandidate, passwordEncrypted)

	return passwordVerify
}
