import { IDateProvider } from "../IDateProvider";

class DateProvider implements IDateProvider{
    dateNow(): Date {
        throw new Error("Method not implemented.");
    }
    convertStringToDate(goal: string): Date {
        throw new Error("Method not implemented.");
    }

}

export {DateProvider};