import { Express, NextFunction, Request, Response } from 'express'

export type Error = {
	message: string
	status: number
  place: string
}

export const errorHandling = (app: Express) => {
	app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
		res.status(error.status || 500).json(error.message)
	})
}
