import express, { Application } from "express";
import { CommonRoutes } from "./common";
import request from "supertest";

describe("CommonRoutes", () => {
  let app: Application;

  beforeEach(() => {
    app = express();
    const commonRoutes = new CommonRoutes();
    commonRoutes.routes(app);
  });

  it("should return 'App up and running.' when GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("App up and running.");
  });
});
