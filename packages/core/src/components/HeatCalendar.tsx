import { type ComponentProps, type ComponentType, useMemo, useCallback, useState, useRef } from 'react';

import Day from './Day';
import Month from './Month';
import { countWeeks, reshuffleMonths } from '../utils/months.utils';
import { DAYS_IN_WEEK } from '../constants/week.constants';
import Store from '../model/Store';
import MonthName from './MonthName';
import DayName from './DayName';

interface HeatCalendarProps<T> {
  size?: number;
  colors?: string[];
  className?: string;
  startsAt?: string | Date;
  data: Array<[string, T]>;
  gutter?: [number, number];
  day?: ComponentType<ComponentProps<typeof Day>>;
  vLabel?: ComponentType<ComponentProps<typeof DayName>> | null;
  hLabel?: ComponentType<ComponentProps<typeof MonthName>> | null;
  dataKey: keyof T | ((current: number | undefined, item: T) => number);
}

function HeatCalendar<T>({
  data,
  colors,
  dataKey,
  className,
  size = 10,
  gutter = [2, 2],
  startsAt = new Date(),
  day: DayRenderer = Day,
  vLabel: VLabelRenderer = DayName,
  hLabel: HLabelRenderer = MonthName,
}: HeatCalendarProps<T>) {
  const labelsRef = useRef<SVGGElement>();
  const [legendWidth, setLegendWidth] = useState(0);

  const hSpace = 3 * gutter[0];
  const vSpace = 3 * gutter[1];
  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  const monthsGrid = useMemo(() => {
    const date = new Date(startsAt);
    const startMonth = date.getMonth();
    const startYear = date.getFullYear();

    let x = 0;

    return reshuffleMonths(startMonth).map((month) => {
      const year = startYear - (month > startMonth ? 1 : 0);
      const weeks = countWeeks(year, month);

      const width = weeks * size + (weeks - 1) * gutter[0];
      const config = {
        x,
        y: 0,
        year,
        month,
        weeks,
        width,
        height,
      };

      x += width + hSpace;

      return config;
    });
  }, [startsAt, size, hSpace, gutter, height]);

  const setRef = useCallback((ref: SVGGElement | null) => {
    if (!ref) {
      return;
    }

    labelsRef.current = ref;

    let max = 0;
    for (let i = 0; i < ref.children.length; i++) {
      max = Math.max(max, ref.children[i].clientWidth);
    }

    setLegendWidth(max);
  }, []);

  const margin = legendWidth + hSpace;
  const last = monthsGrid[monthsGrid.length - 1];
  const viewBoxWidth = last.width + margin + hSpace;

  return (
    <Store data={data} colors={colors} dataKey={dataKey}>
      <svg
        width="100%"
        className={className}
        preserveAspectRatio="xMidYMin meet"
        viewBox={`0 0 ${last.x + viewBoxWidth} ${height + (HLabelRenderer ? size / 2 + vSpace : 0)}`}
      >
        {VLabelRenderer && (
          <g ref={setRef} fill={labelsRef.current ? undefined : 'none'}>
            {new Array(DAYS_IN_WEEK).fill(0).map((_, day) => (
              <VLabelRenderer key={day} day={day} x={legendWidth} y={day * (size + gutter[0])} size={size} />
            ))}
          </g>
        )}
        {(labelsRef.current || !VLabelRenderer) &&
          monthsGrid.map((config) => (
            <Month
              {...config}
              size={size}
              gutter={gutter}
              day={DayRenderer}
              key={config.month}
              x={config.x + margin}
              label={HLabelRenderer}
            />
          ))}
      </svg>
    </Store>
  );
}

export default HeatCalendar;
