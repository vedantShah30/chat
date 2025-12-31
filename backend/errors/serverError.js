import { CustomError } from "./customError.js";

export class serverError extends CustomError {
  constructor(message) {
    super(message, 500, "Internal server error");
  }
}
