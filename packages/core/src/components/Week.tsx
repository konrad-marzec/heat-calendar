import { type ComponentType, useMemo, type ComponentProps } from 'react';

import type DefaultDay from './Day';
import { useStoreValue } from '../model/Store';
import { formatDate } from '../utils/date.utils';
import { DAYS_IN_WEEK } from '../constants/week.constants';
import { getWeekStartDay } from '../utils/week.utils';
import { useHeatMapScale } from '../hooks';

interface WeekProps {
  week: number;
  x: number;
  y: number;
  year: number;
  size: number;
  month: number;
  weeks: number;
  gutter: [number, number];
  day: ComponentType<ComponentProps<typeof DefaultDay>>;
}

function Week({ x: originX, y: originY, week, month, year, size, gutter, weeks, day: Day }: WeekProps) {
  const fitToScale = useHeatMapScale();
  const heat = useStoreValue((store) => store.heatMap);

  const daysGrid = useMemo(() => {
    const height = size + gutter[1];

    let y = 0;
    let count = DAYS_IN_WEEK;
    let dayId = getWeekStartDay(year, month, week);

    if (week === 1) {
      const start = new Date(year, month, 1).getDay();

      count = start ? 8 - start : 1;
      y += height * (start ? start - 1 : 6);
    }

    if (week === weeks) {
      const end = new Date(year, month + 1, 0).getDay();
      count = end || DAYS_IN_WEEK;
    }

    return Array(count)
      .fill(0)
      .map(() => {
        const config = {
          day: dayId,
          y,
        };

        y += height;
        dayId += 1;

        return config;
      });
  }, [year, month, size, gutter, week, weeks]);

  return (
    <g x={originX} y={originY}>
      {daysGrid.map((config) => {
        const value = heat.get(formatDate(new Date(year, month, config.day)));

        return (
          <Day
            key={config.day}
            year={year}
            month={month}
            day={config.day}
            value={value}
            size={size}
            x={originX}
            y={originY + config.y}
            fitToScale={fitToScale}
          />
        );
      })}
    </g>
  );
}

export default Week;
