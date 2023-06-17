import { type ComponentType, useMemo, type ComponentProps } from 'react';

import type DefaultDay from '../Day';
import { useStoreValue } from '../../model/Store';
import { formatDate } from '../../utils/date.utils';
import { getWeekStartDay } from '../../utils/week.utils';
import { useHeatMapScale } from '../../hooks';
import HLabel from '../HLabel';
import { getMonthLastDay } from '../../utils/months.utils';
import { Dim } from '../../types';

interface WeekOfTheYearProps extends Dim {
  size: number;
  year: number;
  week: number;
  month: number;
  gutter: [number, number];
  day: ComponentType<ComponentProps<typeof DefaultDay>>;
  label: ComponentType<ComponentProps<typeof HLabel>> | null;
}

function WeekOfTheYear({
  x: originX,
  y: originY,
  year,
  week,
  size,
  month,
  width,
  height,
  gutter,
  day: Day,
  label: Label,
}: WeekOfTheYearProps) {
  const fitToScale = useHeatMapScale();
  const heat = useStoreValue((store) => store.heatMap);

  const daysGrid = useMemo(() => {
    const height = size + gutter[1];
    const lastDay = getMonthLastDay(year, month);
    let dayId = getWeekStartDay(year, -1, week);
    let monthId = month;

    let y = 0;

    return Array(7)
      .fill(0)
      .map(() => {
        const config = {
          month: monthId,
          day: dayId,
          y,
        };

        y += height;
        dayId += 1;

        if (dayId > lastDay) {
          dayId = 1;
          monthId += 1;
        }

        return config;
      });
  }, [size, gutter, year, week, month]);

  return (
    <g x={originX} y={originY}>
      {daysGrid.map((config) => {
        const value = heat.get(formatDate(new Date(year, config.month, config.day)));

        return (
          <Day
            key={config.day}
            year={year}
            month={config.month}
            day={config.day}
            value={value}
            width={size}
            height={size}
            x={originX}
            y={originY + config.y}
            fitToScale={fitToScale}
          />
        );
      })}
      {Label && <Label x={originX + width / 2} y={originY + height + 3 * gutter[1]} size={size} value={week} />}
    </g>
  );
}

export default WeekOfTheYear;
