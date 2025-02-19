class CustomError extends Error {
  status: number;
  error: any;
  location: string;
  constructor(status: number, message: string, error: any, location: string) {
    super(message);
    this.status = status || 500;
    this.message = message;
    this.error = error;
    this.location = location;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
