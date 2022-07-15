export interface ItravelDTO {
    readonly id?: string;
    country?: string;
    place: string;
    urlFlag?: string;
    goal: string | Date;
}