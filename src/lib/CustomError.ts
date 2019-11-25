export abstract class CustomError extends Error {
  readonly statusCode!: number
  readonly code!: string

  constructor(code: string, message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(message)
    }

    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}

export class CardExpired extends CustomError {
  readonly statusCode = 409

  constructor(message: string | object) {
    super('card_expired', message)
  }
}
