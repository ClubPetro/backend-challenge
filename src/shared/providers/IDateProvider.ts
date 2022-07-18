interface IDateProvider{
    dateNow():Date;
    convertStringToDate(goal:string | Date):Date;
    formatToFront(date:Date):string;
}

export {IDateProvider};