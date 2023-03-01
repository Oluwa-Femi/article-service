import { Express, Request, Response } from "express";
import validateResource from "./resources/middleware";
import {
  createArticleHandler,
  updateArticleHandler
} from "./resources/controller";
import {
  createArticleSchema,
  updateArticleSchema
} from "./resources/schema";;

function routes(app: Express) {
    app.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));

    app.post(
        "/api/articles",
        validateResource(createArticleSchema),
        createArticleHandler
      );
    
      app.put(
        "/api/articles/:articleId",
        validateResource(updateArticleSchema),
        updateArticleHandler
      );
}

export default routes;