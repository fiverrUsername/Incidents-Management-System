import { Priority } from "../../../../../ims-server/src/enums/enum";

export function decodeMessagePriority(message: string): Priority | null {
  const match: RegExpMatchArray | null = message.match(/\bp[0-3]\b/i);
  return match ? Priority[match[0].toUpperCase() as keyof typeof Priority] : null;
}