import * as fs from "fs";
import { environment } from "../environment";
import {
  isValid12HourFormat,
  isValid24HourFormat,
  convertTo24HourFormat,
} from "../utils/date_time";

export interface Schedule {
  id: number;
  line: string;
  departure: number;
  arrival: number;
}

export class ScheduleRepository {
  data: Schedule[] | null;

  constructor() {
    this.data = getScheduleFromFile();
  }

  public getSchedule(): Schedule[] | null {
    return this.data;
  }

  public getScheduleDeparture(line: string, departureTime?: string): Schedule[] | [] | null {
    if (this.data === null) {
      return null;
    }
    if (departureTime === undefined) {
      const result = this.data.filter(schedule => schedule.line === line);
      return result.length > 0 ? result : null;
    }

    let departure = "";
    if (isValid24HourFormat(departureTime)) {
      departure = departureTime;
    } else if (isValid12HourFormat(departureTime)) {
      departure = convertTo24HourFormat(departureTime);
    }

    const result = this.data.filter(
      schedule => schedule.line === line && schedule.departure === Number(departure),
    );
    return result.length > 0 ? result : [];
  }
}

function getScheduleFromFile(): Schedule[] | null {
  if (!fs.existsSync(environment.schedule_file_location)) {
    return null;
  }
  try {
    const data = fs.readFileSync(environment.schedule_file_location);
    return JSON.parse(data.toString());
  } catch (error) {
    return null;
  }
}
