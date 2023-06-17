import { useMemo } from 'react';
import { Category } from '../constants/layout.constants';
import { Data, DataKey } from '../types';
import { getDay, getWeek } from '../utils/category.utils';

const CATEGORY_FN: Record<Category, (timestamp: string) => string> = {
  [Category.MONTH_DAY]: getDay,
  [Category.WEEK_DAY]: getDay,
  [Category.WEEK]: getWeek,
};

export default function useCategorizedData<T>(data: Data<T>, dataKey: DataKey<T>, category: Category) {
  return useMemo(() => {
    const getKey = CATEGORY_FN[category];

    return data.reduce<Map<string, number>>((res, [timestamp, item]) => {
      const key = getKey(timestamp);
      const value = res.get(key);

      if (typeof dataKey === 'string') {
        res.set(key, value ? value + 1 : 0);
      }

      if (typeof dataKey === 'function') {
        res.set(key, dataKey(value, item));
      }

      return res;
    }, new Map());
  }, [category, data, dataKey]);
}
