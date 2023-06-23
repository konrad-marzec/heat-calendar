import { useCallback, useMemo } from 'react';

import { useStoreValue } from '../model/Store';

export function useHeatMapScale() {
  const colors = useStoreValue((store) => store.colors);
  const heatMap = useStoreValue((store) => store.heatMap);

  const [min, max] = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;

    heatMap.forEach((value) => {
      if (min > value) {
        min = value;
      }

      if (max < value) {
        max = value;
      }
    });

    return [min, max];
  }, [heatMap]);

  return useCallback(
    (value?: number | null) => {
      if (!colors?.length) {
        return 'transparent';
      }

      const top = max - min;

      if (top === 0 || value === undefined || value === null) {
        return colors[0];
      }

      const length = colors.length - 1;
      const n = ((value - min) / top) * 100;

      return colors[Math.floor((n * length) / 100)];
    },
    [max, min, colors],
  );
}
