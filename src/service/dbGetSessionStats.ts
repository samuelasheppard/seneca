import { DBStatisticsResponse } from "../types/db/DbTypes";
import CustomError from "../types/error/CustomError";
import db from "../utils/db/connection";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";

const docClient = DynamoDBDocumentClient.from(db);

const dbGetSessionStats = async (
  userId: string,
  sessionId: string,
  courseId: string
): Promise<Array<DBStatisticsResponse>> => {
  try {
    const params: QueryCommandInput = {
      TableName: "session",
      KeyConditionExpression: "user_id = :userId AND session_id = :sessionId",
      FilterExpression: "course_id = :courseId",
      ProjectionExpression:
        "time_studied, average_score, total_modules_studied",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":sessionId": sessionId,
        ":courseId": courseId,
      },
    };

    const command = new QueryCommand(params);
    const dbResponse = await docClient.send(command);

    if (dbResponse.Items?.length === 0) {
      throw Error("404");
    }

    return dbResponse.Items as Array<DBStatisticsResponse>;
  } catch (e: any) {
    if (e.message === "404") {
      throw new CustomError(
        404,
        `No records found for sessionId: ${sessionId}`,
        e,
        "service::dbGetSessionStats"
      );
    }
    throw new CustomError(
      500,
      "Error fetching data",
      e,
      "service::dbGetSessionStats"
    );
  }
};

export default dbGetSessionStats;
