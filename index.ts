import express, { Express } from "express";
import * as bodyParser from "body-parser";
import router from "./src/routers/router";
import logger from "./src/middleware/logRequest";
import errorLogger from "./src/middleware/errorHandler";

const cors = require("cors");

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use(logger);

app.use(router);
app.use(errorLogger);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
