import { type ReactNode, useEffect } from 'react';

import { Category } from '../constants/layout.constants';
import { type Point } from '../types';
import createFastContext from '../utils/createFastContext';

const { Provider, useStore, useSetStore, useStoreValue } = createFastContext({
  colors: [] as string[],
  category: Category.MONTH_DAY,
  heatMap: new Map<string, number>(),
  tooltip: undefined as [unknown, Point] | undefined,
});

interface StoreProps<T> {
  colors?: string[];
  category: Category;
  children: ReactNode;
  data: Map<string, T>;
  tooltip?: [unknown, Point];
}

function InitializeStore<T>({ children, data, colors, category }: StoreProps<T>) {
  const set = useSetStore();

  useEffect(() => {
    set({ heatMap: data });
  }, [data, set]);

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
