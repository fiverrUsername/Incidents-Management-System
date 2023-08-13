import moment from "moment";

export function decodeMessageDate(message: string): Date | null {
    const regex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
    const matches = message.match(regex);
    if (matches && matches.length > 0) {
        const dateString = matches[0];
        const formattedDate = moment(dateString, 'DD/MM/YYYY').toDate();
        return formattedDate;
    }
    return null;
}