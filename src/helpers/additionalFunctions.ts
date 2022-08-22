import { GroupedType } from "../models/models";

export const groupBy = <T>(array: Array<T>, key: string): GroupedType<T>[] => {
  const result = [] as GroupedType<T>[];

  array.forEach((item: any) => {
    const existing = result.find(
      (res: GroupedType<any>) => res.item[key] === item[key]
    );

    if (existing !== undefined) {
      existing.count++;
    } else {
      result.push({ item: item, count: 1 });
    }
  });

  return result;
};
