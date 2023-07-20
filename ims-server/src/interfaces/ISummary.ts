
export interface ISummary  extends Document{
    createdBy:string,
    createdAt:Date,
    currentPriority:string,
    tags: { id: string, name: string }[];
  }
