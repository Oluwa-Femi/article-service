import { Request, Response } from "express";
import { CreateArticleInput, UpdateArticleInput } from "./schema";
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
    res
      .status(500)
      .json({
        status: "error",
        message: "Cannot create a new article at this time, please ensure resource title doesn't exist already.",
      });
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
      res.status(404).json({ status: "error", message: "Resource not found" });
    }

    const updatedArticle = await findAndUpdateArticle({ articleId }, update, {
      new: true,
    });

    return res.json({ status: 200, message: "success", data: updatedArticle });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Cannot update this article at this time",
      });
  }
}

export async function getArticleHandler(
  req: Request<UpdateArticleInput["params"]>,
  res: Response
) {
  try {
    const articleId = req.params.articleId;
    const article = await findArticle({ articleId });

    if (!article) {
      return res
        .status(404)
        .json({ status: "error", message: "Resource not found" });
    }

    return res.json({ status: 200, message: "success", data: article });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Cannot get this article at this time",
      });
  }
}

export async function getAllArticlesHandler(
  req: Request<UpdateArticleInput["params"]>,
  res: Response
) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const articles = await findAllArticles(ArticleModel, page, limit);
    const count = await ArticleModel.countDocuments();
    return res.json({
      status: 200,
      message: "success",
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      totalArticles: count,
      data: articles,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Cannot get these article at this time",
      });
  }
}

export async function deleteArticleHandler(
  req: Request<UpdateArticleInput["params"]>,
  res: Response
) {
  try {
    const articleId = req.params.articleId;

    const article = await findArticle({ articleId });

    if (!article) {
      return res
        .status(404)
        .json({ status: "error", message: "Resource not found" });
    }

    await deleteArticle({ articleId });

    return res.json({
      status: 200,
      message: "Article successfully deleted",
    });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Cannot delete this article at this time",
      });
  }
}
