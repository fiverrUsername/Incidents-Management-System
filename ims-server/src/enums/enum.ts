export enum EncidentType {
    Technical = "technical",
    Securing = "securing",
    Comment = "comment",
}

export enum Status {
    Active = "Active",
    Resolved = "Resolved",
}

export enum Priority {
    P3 = 'p3',
    P2 = 'p2',
    P1 = 'p1',
    P0 = 'p0',
}

export const PRIORITY_INDEX_MAP: Record<Priority, number> = {
    [Priority.P0]: 0,
    [Priority.P1]: 1,
    [Priority.P2]: 2,
    [Priority.P3]: 3,
};

export enum Level {
    info = 'info',
    debug = 'debug',
    error = 'erorr',
    trace = 'trace',
    warn = 'warn',
}