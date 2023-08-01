import { ITimeLineEvent } from "../interface/timeLineInterface";

const filterTimeLineBySearch = (array: ITimeLineEvent[], filterString: string): ITimeLineEvent[] => {
  return array.filter((item) => {

    for (const key in item) {

      if ((key != 'createdAt') && (String(item[key as keyof ITimeLineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
        console.log(key)
        return true;
      }
      if ((key == 'userId') && (String(item[key as keyof ITimeLineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
        console.log(key)
        return true;
      }
    }
    return false;
  });
}

export default filterTimeLineBySearch