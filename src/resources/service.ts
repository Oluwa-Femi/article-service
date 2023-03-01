import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ArticleModel, {
  ArticleDocument,
  ArticleInput,
} from "./model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createArticle(input: ArticleInput) {
  const metricsLabels = {
    operation: "createArticle",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ArticleModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findArticle(
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findArticle",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ArticleModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateArticle(
  query: FilterQuery<ArticleDocument>,
  update: UpdateQuery<ArticleDocument>,
  options: QueryOptions
) {
  return ArticleModel.findOneAndUpdate(query, update, options);
}

export const findAllArticles = async (Model:any, page:any, limit:any) => {
  const docs = await Model.find()
    .limit(limit * 1)
    .skip((Number(page) - 1) * limit)
    .then((result: any) => result)
    .catch((error: any) => error);
  return docs;
};

export async function deleteArticle(query: FilterQuery<ArticleDocument>) {
  return ArticleModel.deleteOne(query);
}