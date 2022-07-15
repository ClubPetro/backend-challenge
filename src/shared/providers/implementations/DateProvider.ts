import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"


dayjs.locale("pt-br");
class DateProvider implements IDateProvider{
    formatToFront(date: Date): string {
        return dayjs(date).format("MM/YYYY");
    }
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertStringToDate(goal: string): Date {
        const values = goal.split("/");
        return dayjs( `${values[1]}/${values[0]}`).toDate();
    }

}

export {DateProvider};