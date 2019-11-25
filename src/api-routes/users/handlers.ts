import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../lib/CustomError'

export async function get(_req: Request, res: Response, next: NextFunction) {
  try {
    // throw new BusinessError({ a: 'b' })
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}

export async function create(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof CustomError)) {
    return next(err)
  }

  return res.status(err.statusCode).send({
    error: {
      code: err.code,
      message: err.message,
    },
  })
}
