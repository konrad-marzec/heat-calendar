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

      if (value < min) {
        return colors[0];
      }

      const size = colors.length;
      const n = ((value - min) / top) * 100;

      return colors[Math.min(Math.floor((n * size) / 100), size - 1)];
    },
    [max, min, colors],
  );
}
