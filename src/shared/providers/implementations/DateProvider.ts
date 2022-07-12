import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
class DateProvider implements IDateProvider{
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertStringToDate(goal: string): Date {
        return dayjs(goal).toDate();
    }

}

export {DateProvider};