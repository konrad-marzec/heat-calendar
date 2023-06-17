import { type ComponentType, useMemo, type ComponentProps } from 'react';

import WeekDayOfTheMonth from './WeekDayOfTheMonth';
import HLabel from '../HLabel';
import { Dim } from '../../types';
import DefaultNode from '../DefaultNode';

interface MonthProps extends Dim {
  year: number;
  size: number;
  month: number;
  weeks: number;
  gutter: [number, number];
  node: ComponentType<ComponentProps<typeof DefaultNode>>;
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
  node: Node,
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
        <WeekDayOfTheMonth
          {...config}
          node={Node}
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
