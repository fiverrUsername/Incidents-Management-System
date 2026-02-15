import { Status } from "../../../../../ims-server/src/enums/enum";

export function decodeMessageStatus(message: string): Status | null {
  const regex: RegExp = /\b(?:Active|active|Resolved|resolved)\b/;
  const match: RegExpMatchArray | null = message.match(regex);
  if (match && match.length > 0) {
    const matchedValue: string = match[0].toUpperCase();
    switch (matchedValue) {
      case "ACTIVE":
        return Status.Active;
      case "RESOLVED":
        return Status.Resolved;
      default:
        return null;
    }
  } else {
    return null;
  }
}