import { parse, addDays } from 'date-fns';

export function decodeMessageDate(message: string): Date | null {
  const regex: RegExp = /\d{4}-\d{2}-\d{2}/;
  const match: RegExpMatchArray = message.match(regex);

  if (match) {
    const dateString: string = match[0];
    const parsedDate: Date = parse(dateString, 'yyyy-MM-dd', new Date());

    // Adding one day to the parsed date
    const newDate: Date = addDays(parsedDate, 1);

    return newDate;
  } else {
    return null;
  }
}