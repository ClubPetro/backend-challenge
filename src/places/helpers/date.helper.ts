import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const formatGoal = (goal: string): string => {
    return dayjs(`01/${goal}`, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

export { formatGoal };
