import { type ComponentType, useMemo, type ComponentProps } from 'react';

import type Day from './Day';
import Week from './Week';
import MonthName from './MonthName';

interface MonthProps {
  x: number;
  y: number;
  year: number;
  month: number;
  weeks: number;
  size: number;
  width: number;
  height: number;
  gutter: [number, number];
  day: ComponentType<ComponentProps<typeof Day>>;
  label: ComponentType<ComponentProps<typeof MonthName>> | null;
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
        <Week
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
      {Label && <Label x={originX + width / 2} y={originY + height + 3 * gutter[1]} month={month} size={size} />}
    </g>
  );
}

export default Month;
