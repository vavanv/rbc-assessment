import { ScheduleRepository, Schedule } from "./schedule";
const fs = require("fs");

describe("ScheduleRepository", () => {
  const mockData: Schedule[] = [
    {
      id: 1,
      line: "A",
      departure: 800,
      arrival: 900,
    },
    {
      id: 2,
      line: "B",
      departure: 1200,
      arrival: 1300,
    },
    {
      id: 3,
      line: "A",
      departure: 1500,
      arrival: 1600,
    },
  ];

  beforeEach(() => {
    // Reset mock fs functions before each test
    jest.clearAllMocks();
  });

  test("getScheduleDeparture should return schedules based on line and departure time", () => {
    const scheduleRepository = new ScheduleRepository();
    scheduleRepository.data = mockData;

    // Test with valid 12-hour format
    expect(scheduleRepository.getScheduleDeparture("B", "12:00 PM")).toEqual([mockData[1]]);

    // Test with undefined departureTime
    expect(scheduleRepository.getScheduleDeparture("A")).toEqual([mockData[0], mockData[2]]);

    // Test with invalid departureTime
    expect(scheduleRepository.getScheduleDeparture("A", "invalid_time")).toEqual([]);
  });

  test("getScheduleDeparture should return empty array when no matching schedules found", () => {
    const scheduleRepository = new ScheduleRepository();
    scheduleRepository.data = mockData;

    expect(scheduleRepository.getScheduleDeparture("C", "10:00")).toEqual([]);
  });

  test("getScheduleDeparture should return null when data is null", () => {
    const scheduleRepository = new ScheduleRepository();
    scheduleRepository.data = null;

    expect(scheduleRepository.getScheduleDeparture("A", "15:00")).toBeNull();
  });
});
