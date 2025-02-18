import express, { Express, NextFunction, Request, Response } from "express";
import {
  DynamoDBClient,
  ListBackupsCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";

import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({ region: "eu-west-1" });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/test", async (req: Request, res: Response, next: NextFunction) => {
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results);
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
