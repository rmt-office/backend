import { createError, throwError } from "./throwError"

export const checkRequired = (input: any, inputName: string) => {
  if (!input) {
    const error = createError(`${inputName} is required`, 400)
    throwError(error)
  }
}