import { NextFunction, Request, Response } from "express";
import { RequestHeaders } from "../types/request/Headers";
import { logError, logResponse } from "../utils/logger/logger";
import dbGetAllCourseStats from "../service/dbGetAllCourseStats";
import formatCourseStats from "../utils/formatters/response/formatCourseStats";

const getCourseStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.header(RequestHeaders.userId) as string;
    const courseId = req.params.courseId;

    const dbResponse = await dbGetAllCourseStats(courseId, userId);

    const response = formatCourseStats(dbResponse);

    logResponse(
      req.body,
      response,
      "controllers:getCourseStats",
      res.locals.requestId
    );
    res.status(201);
    res.send(response);
  } catch (e: any) {
    logError(
      req.body,
      req.path,
      "controllers:getCourseStats",
      e.status,
      e,
      res.locals.requestId
    );
    next(e);
  }
};

export default getCourseStats;
