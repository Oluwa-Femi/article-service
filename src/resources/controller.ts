export { Request, Response } from "express";
import {
    CreateArticleInput,
    UpdateArticleInput,
  } from "./schema";
import {
    createArticle,
    deleteArticle,
    findAndUpdateArticle,
    findArticle,
    findAllArticles,
  } from "./service";

export async function createArticleHandler(req: Request, res: Response) {

};

export async function updateArticleHandler(req: Request, res: Response) {

};

export async function getArticleHandler(req: Request, res: Response) {

};

export async function getAllArticlesHandler(req: Request, res: Response) {

};

export async function deleteArticleHandler(req: Request, res: Response) {

};