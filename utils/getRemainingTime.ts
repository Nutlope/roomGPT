import { utcToZonedTime } from "date-fns-tz";
import { differenceInMilliseconds } from "date-fns";

export default function getRemainingTime() {
  const now = new Date();

  // Convert current date and time to Eastern Timezone
  const et = utcToZonedTime(now, "America/New_York");

  // Determine if current time is before or after 7pm ET
  const isBefore7pmET = et.getHours() < 19; // 7pm ET is 19:00 in 24-hour time

  // Calculate time difference between now and 7pm ET today or tomorrow
  const targetDate = new Date(et);
  targetDate.setHours(19, 0, 0, 0);
  if (!isBefore7pmET) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  const timeDiff = differenceInMilliseconds(targetDate, et);
  const hours = Math.floor(timeDiff / 1000 / 60 / 60);
  const minutes = Math.floor(timeDiff / 1000 / 60) - hours * 60;

  return { hours, minutes };
}
