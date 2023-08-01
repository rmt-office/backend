import { ErrorProps } from "./types"

export const throwError = (error: ErrorProps) => {
  throw error
}

export const createError = (message: string, status: number) => {
  return {
    message,
    status
  }
}

