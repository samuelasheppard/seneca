import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logError, logRequest } from "../utils/logger/logger";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestId = uuidv4();

    res.locals.requestId = requestId;

    logRequest(req.body, req.path, requestId);
    next();
  } catch (error: any) {
    const { requestId } = res.locals;
    logError(
      req.body,
      req.path,
      "middleware::logger",
      error.status,
      error.data,
      requestId
    );
    next(error);
  }
};

export default logger;
