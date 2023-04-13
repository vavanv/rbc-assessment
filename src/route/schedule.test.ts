import express, { Application } from "express";

import request from "supertest";
import { Schedule, ScheduleRepository } from "../repository/schedule";
import { ScheduleRoutes } from "./schedule";

describe("ScheduleRoutes", () => {
  let app: Application;
  let scheduleRepository: ScheduleRepository;

  beforeAll(() => {
    app = express();
    scheduleRepository = new ScheduleRepository();
    const scheduleRoutes = new ScheduleRoutes();
    scheduleRoutes.routes(app, scheduleRepository);
  });

  describe("GET /schedule", () => {
    it("should return schedule if found", async () => {
      const mockSchedule: Schedule[] = [{ id: 1, line: "A", departure: 1200, arrival: 1300 }];
      jest.spyOn(scheduleRepository, "getSchedule").mockReturnValue(mockSchedule);

      const response = await request(app).get("/schedule");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSchedule);
    });

    it("should return 404 if schedule is not found", async () => {
      jest.spyOn(scheduleRepository, "getSchedule").mockReturnValue(null);

      const response = await request(app).get("/schedule");

      expect(response.status).toBe(404);
    });
  });

  describe("GET /schedule/:line", () => {
    it("should return schedule for valid line and departure time", async () => {
      const mockSchedule: Schedule[] = [{ id: 1, line: "A", departure: 1200, arrival: 1300 }];
      jest.spyOn(scheduleRepository, "getScheduleDeparture").mockReturnValue(mockSchedule);

      const response = await request(app).get("/schedule/A").query({ departure: "10:00 AM" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSchedule);
    });

    it("should return 404 if schedule is not found for line and departure time", async () => {
      jest.spyOn(scheduleRepository, "getScheduleDeparture").mockReturnValue(null);

      const response = await request(app).get("/schedule/A").query({ departure: "10:00 AM" });

      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid departure time format is provided", async () => {
      const response = await request(app).get("/schedule/A").query({ departure: "invalid-time" });

      expect(response.status).toBe(400);
    });
  });
});
