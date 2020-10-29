import Hashids from "hashids";
import { ProjectData } from "../../common";

export const addUniqueIdToItems = (
  arrayOfObjects: Array<ProjectData>,
  label: number
): Array<ProjectData> => {
  label = label + 100;
  return arrayOfObjects.map((object, index) => {
    const digits = ("" + label).split("");
    digits.push(index.toString());
    const hashids = new Hashids();
    object["id"] = hashids.encode(digits);
    return object;
  });
};

export const sortArray = <T>(
  items: Array<T>,
  sortString: keyof T,
  order: string
): Array<T> => {
  if (!sortString) {
    return items;
  }
  const multiplier = order === "asc" ? 1 : -1;
  return items.sort((a: T, b: T) =>
    a[sortString] >= b[sortString] ? multiplier : -multiplier
  );
};
