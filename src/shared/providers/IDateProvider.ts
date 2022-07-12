interface IDateProvider{
    dateNow():Date;
    convertStringToDate(goal:string):Date;
}

export {IDateProvider};