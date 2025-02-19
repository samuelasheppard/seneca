import { NextFunction, Request, Response } from "express";
import { logError } from "../utils/logger/logger";
import paramSchema from "../utils/schemas/paramSchemas";
import CustomError from "../types/error/CustomError";

const validateParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;

    try {
      await paramSchema.validateAsync(params);
    } catch (e: any) {
      throw new CustomError(
        400,
        "Url params invalid",
        e,
        "middleware::validateParams"
      );
    }

    next();
  } catch (error: any) {
    const { requestId } = res.locals;
    logError(
      req.body,
      req.path,
      "middleware::validateParams",
      error.status,
      error.data,
      requestId
    );
    next(error);
  }
};

export default validateParams;
