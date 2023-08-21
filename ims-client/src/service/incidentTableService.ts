import IIncident from "../interface/incidentInterface";

export function filterRowsBySearch(array: IIncident[], filterString: string): IIncident[] {
    return array.filter((item) => {
        for (const key in item) {
            if ((key != 'date') && (String(item[key as keyof IIncident]).toLowerCase()).includes(filterString.toLowerCase())) {
                return true;
            }
        }
        return false;
    });
}

export function filterRowsByStatus(array: IIncident[], status: string): IIncident[] {
    return array.filter((item) => item.status === status);
}

export const filterRowsByStatusAndSearch = (array: IIncident[], status: string, filterString: string): IIncident[] => {
    return array.filter((obj: any) => {
        return obj.status === status &&
            Object.keys(obj).some((key) => key !== 'date' && obj[key].toLowerCase().includes(filterString.toLowerCase()));
    });
}

export function IncidentTableService() {
    return {
        filterRowsBySearch,
        filterRowsByStatus,
        filterRowsByStatusAndSearch,
    };
}
