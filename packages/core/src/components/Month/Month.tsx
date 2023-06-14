import { type ComponentType, useMemo, type ComponentProps } from 'react';

import type Day from '../Day';
import WeekOfTheMonth from './WeekOfTheMonth';
import HLabel from '../HLabel';
import { Dim } from '../../types';

interface MonthProps extends Dim {
  year: number;
  size: number;
  month: number;
  weeks: number;
  gutter: [number, number];
  day: ComponentType<ComponentProps<typeof Day>>;
  label: ComponentType<ComponentProps<typeof HLabel>> | null;
}

function Month({
  month,
  x: originX,
  y: originY,
  width,
  year,
  height,
  weeks,
  size,
  gutter,
  day: Day,
  label: Label,
}: MonthProps) {
  const weeksGrid = useMemo(
    () =>
      Array(weeks)
        .fill(0)
        .map((_, week) => ({
          x: originX + week * (size + gutter[0]),
          week: week + 1,
          y: originY,
        })),
    [size, gutter, weeks, originX, originY],
  );

  return (
    <g x={originX} y={originY}>
      {weeksGrid.map((config) => (
        <WeekOfTheMonth
          {...config}
          day={Day}
          year={year}
          size={size}
          month={month}
          weeks={weeks}
          gutter={gutter}
          key={config.week}
        />
      ))}
      {Label && <Label x={originX + width / 2} y={originY + height + 3 * gutter[1]} value={month} size={size} />}
    </g>
  );
}

export default Month;
