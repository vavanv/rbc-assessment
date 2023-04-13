import { isValid24HourFormat, isValid12HourFormat, convertTo24HourFormat } from "./date_time";

describe("isValid24HourFormat", () => {
  it("should return true for valid 24-hour format times", () => {
    expect(isValid24HourFormat("0000")).toBe(true);
    expect(isValid24HourFormat("2359")).toBe(true);
    expect(isValid24HourFormat("0130")).toBe(true);
    expect(isValid24HourFormat("1200")).toBe(true);
    expect(isValid24HourFormat("130")).toBe(true);
  });

  it("should return false for invalid 24-hour format times", () => {
    expect(isValid24HourFormat("2400")).toBe(false);
    expect(isValid24HourFormat("0060")).toBe(false);
    expect(isValid24HourFormat("1260")).toBe(false);
    expect(isValid24HourFormat("1200 PM")).toBe(false);
    expect(isValid24HourFormat("0000 AM")).toBe(false);
  });
});

describe("isValid12HourFormat", () => {
  it("should return true for valid 12-hour format times", () => {
    expect(isValid12HourFormat("12:00 AM")).toBe(true);
    expect(isValid12HourFormat("12:00 PM")).toBe(true);
    expect(isValid12HourFormat("01:30 am")).toBe(true);
    expect(isValid12HourFormat("11:59 pm")).toBe(true);
    expect(isValid12HourFormat("1:30 PM")).toBe(true);
    expect(isValid12HourFormat("1:30PM")).toBe(true);
  });

  it("should return false for invalid 12-hour format times", () => {
    expect(isValid12HourFormat("00:00")).toBe(false);
    expect(isValid12HourFormat("12:60 PM")).toBe(false);
    expect(isValid12HourFormat("12:00 MM")).toBe(false);
    expect(isValid12HourFormat("13:00 PM")).toBe(false);
  });
});

describe("convertTo24HourFormat", () => {
  it("should convert valid 12-hour format times to 24-hour format", () => {
    expect(convertTo24HourFormat("12:00 AM")).toBe("0000");
    expect(convertTo24HourFormat("12:00 PM")).toBe("1200");
    expect(convertTo24HourFormat("01:30 am")).toBe("0130");
    expect(convertTo24HourFormat("11:59 pm")).toBe("2359");
    expect(convertTo24HourFormat("1:30 PM")).toBe("1330");
  });

  it("should throw an error for invalid 12-hour format times", () => {
    expect(() => convertTo24HourFormat("00:00")).toThrow("Invalid time format");
    expect(() => convertTo24HourFormat("12:00 MM")).toThrow("Invalid time format");
  });
});
