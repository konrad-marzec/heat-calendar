import { useMemo } from 'react';

import { Category } from '../constants/layout.constants';
import { type Data, type DataKey } from '../types';
import { getDay, getWeek } from '../utils/category.utils';

const CATEGORY_FN: Record<Category, (timestamp: string) => string> = {
  [Category.MONTH_DAY]: getDay,
  [Category.WEEK_DAY]: getDay,
  [Category.WEEK]: getWeek,
};

export function useCategorizedData<T>(data: Data<T>, dataKey: DataKey<T>, category: Category) {
  return useMemo(() => {
    const getKey = CATEGORY_FN[category];

    return data.reduce<Map<string, number>>((res, [timestamp, item]) => {
      const key = getKey(timestamp);
      const value = res.get(key);

      if (typeof dataKey === 'function') {
        res.set(key, dataKey(value, item));
      }

      if (typeof dataKey === 'string') {
        const val = item[dataKey];

        if (typeof val === 'number') {
          res.set(key, (value ?? 0) + val);
        } else {
          res.set(key, (value ?? 0) + 1);
        }
      }

      return res;
    }, new Map());
  }, [category, data, dataKey]);
}
