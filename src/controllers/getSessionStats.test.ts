import { Request, Response, NextFunction } from "express";
import getSessionStats from "../controllers/getSessionStats";
import dbGetSessionStats from "../service/dbGetSessionStats";
import formatCourseStats from "../utils/formatters/response/formatCourseStats";
import { logError, logResponse } from "../utils/logger/logger";

jest.mock("../service/dbGetSessionStats");
jest.mock("../utils/formatters/response/formatCourseStats");
jest.mock("../utils/logger/logger");

describe("getSessionStats Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue("test-user-id"),
      params: { courseId: "test-course-id", sessionId: "test-session-id" },
      body: {},
      path: "/session/stats",
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: { requestId: "test-request-id" },
    };
    next = jest.fn();
  });

  it("should return formatted session stats on success", async () => {
    const mockDbResponse = { some: "data" };
    const mockFormattedResponse = { formatted: "data" };

    (dbGetSessionStats as jest.Mock).mockResolvedValue(mockDbResponse);
    (formatCourseStats as jest.Mock).mockReturnValue(mockFormattedResponse);

    await getSessionStats(req as Request, res as Response, next);

    expect(dbGetSessionStats).toHaveBeenCalledWith(
      "test-user-id",
      "test-session-id",
      "test-course-id"
    );
    expect(formatCourseStats).toHaveBeenCalledWith(mockDbResponse);
    expect(logResponse).toHaveBeenCalledWith(
      req.body,
      mockFormattedResponse,
      "controllers:getSessionStats",
      res.locals?.requestId
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockFormattedResponse);
  });

  it("should call next with error if dbGetSessionStats throws", async () => {
    const mockError = new Error("DB Error");
    (dbGetSessionStats as jest.Mock).mockRejectedValue(mockError);

    await getSessionStats(req as Request, res as Response, next);

    expect(logError).toHaveBeenCalledWith(
      req.body,
      req.path,
      "controllers:getSessionStats",
      undefined,
      mockError,
      res.locals?.requestId
    );
    expect(next).toHaveBeenCalledWith(mockError);
  });
});
