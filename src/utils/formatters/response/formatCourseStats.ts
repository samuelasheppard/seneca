import { DBStatisticsResponse } from "../../../types/db/DbTypes";
import { GetCourseStatsResponseType } from "../../../types/response/ApiResponseTypes";

const formatCourseStats = (
  dbResponse: Array<DBStatisticsResponse>
): GetCourseStatsResponseType => {
  const timeStudied = dbResponse.reduce((acc, entry) => {
    return acc + entry.time_studied;
  }, 0);
  const totalModulesStudied = dbResponse.reduce((acc, entry) => {
    return acc + entry.total_modules_studied;
  }, 0);
  const averageScore =
    dbResponse.reduce((acc, entry) => {
      return acc + entry.time_studied;
    }, 0) / dbResponse.length;

  return { timeStudied, totalModulesStudied, averageScore };
};

export default formatCourseStats;
