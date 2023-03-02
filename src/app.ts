import express, { Request, Response } from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import responseTime from "response-time";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import createServer from "./utils/server";

const port = config.get<number>("port");

const app = createServer();

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.listen(port, async () => {
  logger.info(`REST API on http://localhost:${port}`);

  await connect();

  startMetricsServer();
});
