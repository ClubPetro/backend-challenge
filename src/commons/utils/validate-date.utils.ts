import { HttpException, HttpStatus } from '@nestjs/common';
import { isExists } from 'date-fns';

export const validateDate = (date: string | Date): Date => {
  if (!date) {
    throw new HttpException(
      'The date can not be empty',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (typeof date === 'object') {
    return date;
  }

  const [month, year] = date.split('/');

  if (!isExists(+year, +month - 1, 1)) {
    throw new HttpException('The date is not valid', HttpStatus.BAD_REQUEST);
  }

  return new Date(+year, +month - 1, 1);
};
