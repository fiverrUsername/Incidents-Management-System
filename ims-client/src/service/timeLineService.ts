import { TimelineEvent } from "../pages/timeLine/modules/interface";

const filterTimeLineBySearch = (array: TimelineEvent[], filterString: string): TimelineEvent[] => {
    return array.filter((item) => {

      for (const key in item) {

        if ((key != 'createdAt') && (String(item[key as keyof TimelineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
          console.log(key)
          return true;
        }
        if ((key == 'userId') && (String(item[key as keyof TimelineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
          console.log(key)
          return true;
        }
      }
      return false;
    });
  }

  export default filterTimeLineBySearch