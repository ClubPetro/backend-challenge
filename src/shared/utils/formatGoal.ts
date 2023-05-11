import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function formatGoalDate(goal: string): string {
  const parsedDate = dayjs(goal, "DD/MM/YYYY", true);
  return parsedDate.format("MM/YYYY");
}
