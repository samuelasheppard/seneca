import { NextFunction, Request, Response } from "express";
import addCourseSessionSchema from "../utils/schemas/addCourseSessionSchema";
import CustomError from "../types/error/CustomError";
import { RequestHeaders } from "../types/request/Headers";
import dbAddCourseSession from "../service/dbAddCourseSession";
import { logError, logResponse } from "../utils/logger/logger";

const addCourseSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    try {
      await addCourseSessionSchema.validateAsync(req.body);
    } catch (e: any) {
      throw new CustomError(
        400,
        "Invalid request body",
        e,
        "controllers::addCourseSession"
      );
    }

    const userId = req.header(RequestHeaders.userId) as string;
    const courseId = req.params.courseId;
    const { sessionId, totalModulesStudied, averageScore, timeStudied } =
      req.body;

    //TO DO: check if sessionId already exists?

    await dbAddCourseSession(
      courseId,
      userId,
      sessionId,
      totalModulesStudied,
      averageScore,
      timeStudied
    );

    const response = `Ceated new entry for session: ${sessionId}`;

    logResponse(
      req.body,
      response,
      "controllers:addCourseSession",
      res.locals.requestId
    );
    res.status(201);
    res.send(response);
  } catch (e: any) {
    logError(
      req.body,
      req.path,
      "controllers:addCourseSession",
      e.status,
      e,
      res.locals.requestId
    );
    next(e);
  }
};

export default addCourseSession;
