
import { parse, addDays } from 'date-fns';

export function decodeMessageDate(message: string): Date | null {
  const regex = /\d{4}-\d{2}-\d{2}/;
  const match = message.match(regex);

  if (match) {
    const dateString = match[0];
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    
    // Adding one day to the parsed date
    const newDate = addDays(parsedDate, 1);

    return newDate;
  } else {
    return null;
  }
}
