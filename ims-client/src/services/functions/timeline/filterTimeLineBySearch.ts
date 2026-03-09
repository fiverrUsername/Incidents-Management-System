import { ITimeLineEvent } from "../../../interfaces/ITimeLineEvent";

export const filterTimeLineBySearch = (array: ITimeLineEvent[], filterString: string): ITimeLineEvent[] => {
  return array.filter((item) => {

    for (const key in item) {

      if ((key != 'createdAt') && (String(item[key as keyof ITimeLineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
        return true;
      }
      if ((key == 'userId') && (String(item[key as keyof ITimeLineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
}