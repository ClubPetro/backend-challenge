import { compareAsc } from 'date-fns';

/* Se a primeira data é menor, retorne true
 * se for maior ou igual, retorne false
 */
export const compareDate = (firstDate: Date, secondDate: Date): boolean => {
  const result = compareAsc(firstDate, secondDate);
  if (result === -1) {
    return true;
  } else {
    return false;
  }
};
