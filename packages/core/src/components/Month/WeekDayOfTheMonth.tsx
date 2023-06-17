import { type ComponentType, useMemo, type ComponentProps } from 'react';

import { useStoreValue } from '../../model/Store';
import { formatDate } from '../../utils/date.utils';
import { DAYS_IN_WEEK } from '../../constants/week.constants';
import { getWeekStartDay } from '../../utils/week.utils';
import { useHeatMapScale } from '../../hooks';
import Hoverable from '../Hoverable';
import { Point } from '../../types';
import DefaultNode from '../DefaultNode';

interface WeekDayOfTheMonthProps extends Point {
  week: number;
  year: number;
  size: number;
  month: number;
  weeks: number;
  gutter: [number, number];
  node: ComponentType<ComponentProps<typeof DefaultNode>>;
}

function WeekDayOfTheMonth({
  x: originX,
  y: originY,
  year,
  month,
  week,
  size,
  gutter,
  weeks,
  node: Node,
}: WeekDayOfTheMonthProps) {
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
        const date = formatDate(year, month, config.day);
        const value = heat.get(date);
        const y = originY + config.y;
        const x = originX;

        const data = {
          day: config.day,
          month,
          value,
          date,
          year,
        };

        return (
          <Hoverable key={config.day} data={data}>
            <Node
              fitToScale={fitToScale}
              year={year}
              month={month}
              day={config.day}
              value={value}
              width={size}
              height={size}
              x={x}
              y={y}
            />
          </Hoverable>
        );
      })}
    </g>
  );
}

export default WeekDayOfTheMonth;
