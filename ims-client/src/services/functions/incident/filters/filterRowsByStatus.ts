import IIncident from "../../../../interfaces/IIncident";

export function filterRowsByStatus(array: IIncident[], status: string): IIncident[] {
    return array.filter((item) => item.status === status);
}
