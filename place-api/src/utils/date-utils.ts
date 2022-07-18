export class DateUtils {
    public formatDate(date, format) {
        const map = {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            mm: date.getMonth() + 1,
            aaaa: date.getFullYear(),
        }
        return format.replace(/mm|aaaa/gi, matched => map[matched])
    }
}
