import { Express, Request, Response } from "express";
import validateResource from "./resources/middleware";
import {
  createArticleHandler,
  updateArticleHandler,
  getArticleHandler,
  getAllArticlesHandler,
  deleteArticleHandler
} from "./resources/controller";
import {
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  getArticleSchema
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

      app.get(
        "/api/articles/:articleId",
        validateResource(getArticleSchema),
        getArticleHandler
      );
    
      app.get("/api/articles", getAllArticlesHandler);
    
      app.delete(
        "/api/articles/:articleId",
        validateResource(deleteArticleSchema),
        deleteArticleHandler
      );
}

export default routes;