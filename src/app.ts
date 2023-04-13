import express from "express";
import cors from "cors";
import helmet from "helmet";
import { CommonRoutes } from "./route/common";
import { ScheduleRoutes } from "./route/schedule";
import { ScheduleRepository } from "./repository/schedule";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();

    const scheduleRepository = new ScheduleRepository();

    new ScheduleRoutes().routes(this.express, scheduleRepository);
    new CommonRoutes().routes(this.express);
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    this.express.use(cors());
    this.express.disable("x-powered-by");
    this.express.use(helmet());
  }
}

export default new App().express;
