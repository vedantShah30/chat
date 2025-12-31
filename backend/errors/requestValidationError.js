export class RequestValidationError extends CustomError {
  constructor(message) {
    super(message, 400, "Bad request error");
  }
}
