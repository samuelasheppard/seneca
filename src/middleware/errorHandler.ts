import { NextFunction, Request, Response } from "express";

const errorLogger = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = {
    status: error.status || 500,
    message: error.message || "Unexpected error occured",
    requestId: res.locals.requestId,
  };

  res.status(error.status).send(errorMessage);
};

export default errorLogger;
