import { NextFunction, Request, Response } from "express";
import { RequestHeaders } from "../types/request/Headers";
import { logError, logResponse } from "../utils/logger/logger";
import formatCourseStats from "../utils/formatters/response/formatCourseStats";
import dbGetSessionStats from "../service/dbGetSessionStats";

const getSessionStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.header(RequestHeaders.userId) as string;
    const courseId = req.params.courseId;
    const sessionId = req.params.sessionId;
    console.log(userId, courseId, sessionId);
    const dbResponse = await dbGetSessionStats(userId, sessionId, courseId);

    const response = formatCourseStats(dbResponse);

    logResponse(
      req.body,
      response,
      "controllers:getSessionStats",
      res.locals.requestId
    );
    res.status(201);
    res.send(response);
  } catch (e: any) {
    logError(
      req.body,
      req.path,
      "controllers:getSessionStats",
      e.status,
      e,
      res.locals.requestId
    );
    next(e);
  }
};

export default getSessionStats;
