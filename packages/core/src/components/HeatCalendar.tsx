import { type ComponentProps, type ComponentType, useMemo, useCallback, useState, useRef } from 'react';

import Day from './Day';
import { DAYS_IN_WEEK } from '../constants/week.constants';
import Store from '../model/Store';
import HLabel from './HLabel';
import DayName from './DayName';
import { Category } from '../constants/layout.constants';
import { layoutFactory } from '../utils/layout.utils';
import Tooltip from '../Tooltip';

interface HeatCalendarProps<T> {
  size?: number;
  colors?: string[];
  className?: string;
  category?: Category;
  startsAt?: string | Date;
  data: Array<[string, T]>;
  gutter?: [number, number];
  tooltip?: ComponentType<ComponentProps<any>>;
  day?: ComponentType<ComponentProps<typeof Day>>;
  vLabel?: ComponentType<ComponentProps<typeof DayName>> | null;
  hLabel?: ComponentType<ComponentProps<typeof HLabel>> | null;
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
  tooltip: TooltipContent,
  category = Category.MONTH,
  vLabel: VLabelRenderer = DayName,
  hLabel: HLabelRenderer = HLabel,
}: HeatCalendarProps<T>) {
  const labelsRef = useRef<SVGGElement>();
  const [legendWidth, setLegendWidth] = useState(0);

  const [Layout, grid] = useMemo(
    () =>
      layoutFactory(new Date(startsAt), category, {
        size,
        gutter,
      }),
    [category, gutter, size, startsAt],
  );

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

  const hSpace = 3 * gutter[0];
  const vSpace = 3 * gutter[1];
  const margin = legendWidth + hSpace;
  const viewBoxWidth = grid.width + margin + hSpace;
  const viewBoxHeight = grid.height + (HLabelRenderer ? size / 2 + vSpace : 0);
  const canRenderContent = !VLabelRenderer || labelsRef.current;

  return (
    <Store data={data} colors={colors} category={category} dataKey={dataKey}>
      <svg
        width="100%"
        className={className}
        preserveAspectRatio="xMidYMin meet"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {VLabelRenderer && (
          <g ref={setRef} fill={labelsRef.current ? undefined : 'none'}>
            {new Array(DAYS_IN_WEEK).fill(0).map((_, day) => (
              <VLabelRenderer key={day} day={day} x={legendWidth} y={day * (size + gutter[0])} size={size} />
            ))}
          </g>
        )}
        {canRenderContent &&
          grid?.data.map((config) => (
            <Layout
              {...config}
              size={size}
              gutter={gutter}
              key={config.key}
              day={DayRenderer}
              x={config.x + margin}
              label={HLabelRenderer}
            />
          ))}
      </svg>
      {TooltipContent && (
        <Tooltip>
          <TooltipContent />
        </Tooltip>
      )}
    </Store>
  );
}

export default HeatCalendar;
