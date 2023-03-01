import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ArticleModel, { ArticleDocument, ArticleInput } from "./model";

export async function createArticle(input: ArticleInput) {
  try {
    const result = await ArticleModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findArticle(
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await ArticleModel.findOne(query, {}, options);
    return result;
  } catch (e) {
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

export const findAllArticles = async (Model: any, page: any, limit: any) => {
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
