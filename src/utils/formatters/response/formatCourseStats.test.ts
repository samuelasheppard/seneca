import formatCourseStats from "./formatCourseStats";
import { DBStatisticsResponse } from "../../../types/db/DbTypes";
import { GetCourseStatsResponseType } from "../../../types/response/ApiResponseTypes";

describe("formatCourseStats", () => {
  test("should return correct stats for a given dataset", () => {
    const dbResponse: DBStatisticsResponse[] = [
      { time_studied: 10, total_modules_studied: 2, average_score: 80 },
      { time_studied: 20, total_modules_studied: 3, average_score: 90 },
      { time_studied: 30, total_modules_studied: 5, average_score: 70 },
    ];

    const result: GetCourseStatsResponseType = formatCourseStats(dbResponse);

    expect(result).toEqual({
      timeStudied: 60,
      totalModulesStudied: 10,
      averageScore: 20,
    });
  });

  test("should handle an empty array and return zeros", () => {
    const result: GetCourseStatsResponseType = formatCourseStats([]);

    expect(result).toEqual({
      timeStudied: 0,
      totalModulesStudied: 0,
      averageScore: NaN,
    });
  });
});
