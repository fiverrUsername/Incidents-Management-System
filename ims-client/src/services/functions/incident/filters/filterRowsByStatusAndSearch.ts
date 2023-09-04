import IIncident from "../../../../interfaces/IIncident";

export const filterRowsByStatusAndSearch = (array: IIncident[], status: string, filterString: string): IIncident[] => {
    return array.filter((obj: IIncident) => {
        return obj.status === status &&
            Object.keys(obj).some((key) => key !== 'date' &&  (String(obj[key as keyof IIncident]).toLowerCase()).includes(filterString.toLowerCase()));
                                                         
    });
}