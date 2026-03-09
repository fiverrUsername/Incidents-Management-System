import { Status } from "../../../../../ims-server/src/enums/enum";

export function decodeMessageStatus(message: string): Status | null {
  const match: RegExpMatchArray | null = message.match(/\b(active|resolved)\b/i);
  return match ? Status[match[1] as keyof typeof Status] : null;
}