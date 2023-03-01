import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const nanoid = customAlphabet('1234567890abcdef', 5);

export interface ArticleInput {
  title: string;
  body: string;
  slug: string;
  imageUrl: string;
}

export interface ArticleDocument extends ArticleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
      default: () => `${nanoid()}`,
    },
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    slug: { type: String, slug:"title" },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("save", function(next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

const ArticleModel = mongoose.model<ArticleDocument>("Article", articleSchema);

export default ArticleModel;