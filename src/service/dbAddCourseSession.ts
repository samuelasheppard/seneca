import CustomError from "../types/error/CustomError";
import db from "../utils/db/connection";
import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

const dbAddCourseSession = async (
  courseId: string,
  userId: string,
  sessionId: string,
  totalModulesStudied: number,
  averageScore: number,
  timeStudied: number
) => {
  try {
    const params: PutItemCommandInput = {
      Item: {
        session_id: { S: sessionId },
        user_id: { S: userId },
        course_id: { S: courseId },
        total_modules_studied: {
          N: totalModulesStudied.toString(),
        },
        average_score: { N: averageScore.toString() },
        time_studied: { N: timeStudied.toString() },
      },
      TableName: "session",
      ReturnValues: "ALL_OLD",
      ConditionExpression: "attribute_not_exists(session_id)",
    };
    const command = new PutItemCommand(params);

    await db.send(command);

    return sessionId;
  } catch (e: any) {
    if (e.name === "ConditionalCheckFailedException") {
      throw new CustomError(
        403,
        "Session already exists",
        e,
        "service::dbAddCourseSession"
      );
    }
    throw new CustomError(
      503,
      "Unable to add session",
      e,
      "service::dbAddCourseSession"
    );
  }
};
export default dbAddCourseSession;
