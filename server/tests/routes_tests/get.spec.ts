import request from "supertest";
import express from "express";

describe("Test Routes Testing", () => {
  let app: any;
  beforeAll(() => {
    app = express();
  });
  describe("Get Method for /api/test Testing", () => {
    it("Should return an normal response", async () => {
      const mock = jest.fn();
      const response = await request(app).get("/api/test");
      console.log(response.body);
    });
  });
});
