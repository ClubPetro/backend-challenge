import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { format, isBefore, isValid, parseISO } from 'date-fns';
import isAfter from 'date-fns/isAfter';

export class DateUtils {

  public isValidFormat: boolean;
  public dateIsAfter: boolean;
  public dateEntity: Date;
  public dateResult: string;
  public goal: string;

  constructor(goal: string) {
    this.goal = goal
  }

  public validateDate(): void {

    const char = '/'
    const replacer = new RegExp(char, 'g')
    const DateNow = new Date();

    try {
      var dateFormat;
     this.goal = this.goal.trim();
      this.goal = this.goal.replace(replacer, '-');
      const test = this.goal.split('-');
      if (test.length === 2)
        dateFormat = `${test[1]}-${test[0]}-${ ('0'+ DateNow.getDate()).slice(-2)} 00:00:00`;
      if (test.length === 3)
        dateFormat = `${test[2]}-${test[1]}-${test[0]} 00:00:00`;
      const parsedDate = parseISO(dateFormat);
      if (isValid(parsedDate))
        this.isValidFormat = true;
      this.dateEntity = parsedDate;
      
      if(parsedDate.getFullYear() >= DateNow.getFullYear() &&
         parsedDate.getMonth()    >= DateNow.getMonth()    && 
         parsedDate.getDate()     >= DateNow.getDate() ){
          this.dateIsAfter = true;
        }

    } catch (error) {
      this.dateResult = error;
    }
  }
}