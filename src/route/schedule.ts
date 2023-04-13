import express, { Request, Response } from "express";
import { ScheduleRepository } from "../repository/schedule";
import { isValid24HourFormat, isValid12HourFormat } from "../utils/date_time";

export class ScheduleRoutes {
  public routes = (express: express.Application, scheduleRepository: ScheduleRepository) => {
    express.get("/schedule", (req: Request, res: Response) => {
      const schedule = scheduleRepository.getSchedule();
      if (schedule !== null) {
        res.status(200).json(schedule);
      } else {
        res.status(404).send();
      }
    });

    express.get("/schedule/:line", (req: Request, res: Response) => {
      const line = req.params.line;
      const departureTime = req.query.departure as string;

      if (
        departureTime !== undefined &&
        !isValid24HourFormat(departureTime) &&
        !isValid12HourFormat(departureTime)
      ) {
        res.status(400).send();
        return;
      }
      const schedule = scheduleRepository.getScheduleDeparture(line, departureTime);
      if (schedule === null) {
        res.status(404).json();
      } else {
        res.status(200).json(schedule);
      }
    });
  };
}
