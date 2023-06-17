import { ReactNode, useEffect } from 'react';
import createFastContext from '../utils/createFastContext';
import { formatDate } from '../utils/date.utils';
import { Category } from '../constants/layout.constants';
import { Point } from '../types';

const { Provider, useStore, useSetStore, useStoreValue } = createFastContext({
  heatMap: new Map(),
  colors: [] as string[],
  category: Category.MONTH,
  tooltip: undefined as [unknown, Point] | undefined,
});

interface StoreProps<T> {
  colors?: string[];
  category: Category;
  children: ReactNode;
  data: Array<[string, T]>;
  tooltip?: [unknown, Point];
  dataKey: keyof T | ((current: number | undefined, item: T) => number);
}

function InitializeStore<T>({ children, data, dataKey, colors, category }: StoreProps<T>) {
  const set = useSetStore();

  useEffect(() => {
    const heatMap = data.reduce<Map<string, number>>((res, [time, item]) => {
      const key = formatDate(new Date(time));
      const value = res.get(key);

      if (typeof dataKey === 'string') {
        res.set(key, value ? value + 1 : 0);
      }

      if (typeof dataKey === 'function') {
        res.set(key, dataKey(value, item));
      }

      return res;
    }, new Map());

    set({ heatMap });
  }, [data, dataKey, set]);

  useEffect(() => {
    set({ colors });
  }, [set, colors]);

  useEffect(() => {
    set({ category });
  }, [set, category]);

  return children;
}

function Store<T>(props: StoreProps<T>) {
  return (
    <Provider>
      <InitializeStore {...props} />
    </Provider>
  );
}

export { useStore, useSetStore, useStoreValue };

export default Store;
