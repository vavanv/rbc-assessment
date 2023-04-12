import dotenv from "dotenv";

const DEFAULT_PORT = 8081;

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

interface Environment {
  port: number | string;
  schedule_file_location: string;
}

export const environment: Environment = {
  port: process.env.PORT || DEFAULT_PORT,
  schedule_file_location: process.env.SCHEDULE_FILE_LOCATION || "schedule.json",
};
