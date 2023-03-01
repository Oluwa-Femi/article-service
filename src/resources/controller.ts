import { Request, Response } from "express";
import { CreateArticleInput, UpdateArticleInput } from "./schema";
import { string } from "zod";
import ArticleModel from "./model";
import {
  createArticle,
  deleteArticle,
  findAndUpdateArticle,
  findArticle,
  findAllArticles,
} from "./service";

export async function createArticleHandler(
  req: Request<{}, {}, CreateArticleInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;

    const article = await createArticle({
      ...body,
      slug: "",
    });

    return res.json({ status: 200, message: "success", data: article });
  } catch (err) {
    res.status(500).json({ Error });
  }
}

export async function updateArticleHandler(
  req: Request<UpdateArticleInput["params"]>,
  res: Response
) {
  try {
    const articleId = req.params.articleId;
    const update = req.body;

    const article = await findArticle({ articleId });

    if (!article) {
      return res.sendStatus(404);
    }

    const updatedArticle = await findAndUpdateArticle({ articleId }, update, {
      new: true,
    });

    return res.json({ status: 200, message: "success", data: updatedArticle });
  } catch (err) {
    res.status(500).json({ Error });
  }
}

export async function getArticleHandler(req: Request, res: Response) {}

export async function getAllArticlesHandler(req: Request, res: Response) {}

export async function deleteArticleHandler(req: Request, res: Response) {}
