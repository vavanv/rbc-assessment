import express, { Request, Response } from "express";

export class CommonRoutes {
  public routes = (express: express.Application): void => {
    express.get("/", (_: Request, res: Response) => {
      res.send("App up and running.");
    });

    express.use("*", (_: Request, res: Response) => {
      res.send("Make sure url is correct!");
    });
  };
}
