import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
      title: string({
        required_error: "Title is required",
      }),
      body: string({
        required_error: "Body is required",
      }).min(120, "Body should be at least 120 characters long"),
      imageUrl: string({
        required_error: "Image is required",
      }),
    }),
  };
  
  const params = {
    params: object({
      articleId: string({
        required_error: "productId is required",
      }),
    }),
  };
  
  export const createArticleSchema = object({
    ...payload,
  });
  
  export const updateArticleSchema = object({
    ...payload,
    ...params,
  });
  
  export const deleteArticleSchema = object({
    ...params,
  });
  
  export const getArticleSchema = object({
    ...params,
  });
  
  export type CreateArticleInput = TypeOf<typeof createArticleSchema>;
  export type UpdateArticleInput = TypeOf<typeof updateArticleSchema>;
  export type GetArticleInput = TypeOf<typeof getArticleSchema>;
  export type DeleteArticleInput = TypeOf<typeof deleteArticleSchema>;