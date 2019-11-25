import { Request, Response, NextFunction } from 'express'

export async function get(_req: Request, res: Response, next: NextFunction) {
  try {
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
