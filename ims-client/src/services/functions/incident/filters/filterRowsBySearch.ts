import IIncident from "../../../../interfaces/IIncident";

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
