import { Priority } from "../../../../../ims-server/src/enums/enum";

export function decodeMessagePriority(message: string): Priority | null {
    const regex = /\b[Pp][0-3]\b/;
    const match = message.match(regex);
    if (match && match.length > 0) {
      const matchedValue = match[0].toUpperCase();
      switch (matchedValue) {
        case "P0" || "p0":
          return Priority.P0;
        case "P1" || "p1":
          return Priority.P1;
        case "P2" || "p2":
          return Priority.P2;
        case "P3" || "p3":
          return Priority.P3;
        default:
          return null;
      }
    } else {
      return null;
    }
  }