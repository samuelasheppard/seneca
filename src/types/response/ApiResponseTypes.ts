export interface GetCourseStatsResponseType {
  totalModulesStudied: number;
  averageScore: number;
  timeStudied: number;
}

export interface GetSessionStatsResponseType
  extends GetCourseStatsResponseType {
  sessionId: string;
}
