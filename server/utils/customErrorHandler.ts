class ApiError extends Error {
  statusCode: number;
  errors: Array<any>;
  data: any;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: Array<any> = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}
class ValidationError extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

export { ApiError, NotFoundError, ValidationError };
