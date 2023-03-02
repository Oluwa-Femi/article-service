import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createArticle } from "../resources/service";

const app = createServer();

export const articlePayload = {
  title: "Hurraalalala",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  imageUrl: "https://i.imgur.com/QlRphfQ.jpg",
};

describe("article", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get article route", () => {
    describe("given the article does not exist", () => {
      it("should return a 404", async () => {
        const articleId = "article-123";

        await supertest(app).get(`/api/articles/${articleId}`).expect(404);
      });
    });
  });

  describe("Create product route", () => {
    it("should return a 200 status ", async () => {
      const newArticlePayload = {
        title: "Hurrpoi65alpoa",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        imageUrl: "https://i.imgur.com/QlRphfQ.jpg",
      };
      const res = await supertest(app)
        .post("/api/articles")
        .send(newArticlePayload);

      expect(res.body.status).toEqual(200);
    });

    const incompletePayload = {
      title: "Hurrpoi65ala",
      imageUrl: "https://i.imgur.com/QlRphfQ.jpg",
    };
    it("should throw error when a property is missing", async () => {
      const res = await supertest(app)
        .post("/api/articles")
        .send(incompletePayload);

      expect(res.body[0].code).toBe("invalid_type");
    });
  });
});
