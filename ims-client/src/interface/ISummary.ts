export interface ISummary {
    createdBy:string,
    createdAt:Date,
    currentPriority:string,
    tags: { id: string, name: string }[];
  }