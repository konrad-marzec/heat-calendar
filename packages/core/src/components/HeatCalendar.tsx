import { type ComponentProps, type ComponentType, useMemo, useCallback, useState, useRef } from 'react';

import DefaultNode from './DefaultNode';
import { DAYS_IN_WEEK } from '../constants/week.constants';
import Store from '../model/Store';
import HLabel from './HLabel';
import VLabel from './VLabel';
import { Category } from '../constants/layout.constants';
import { layoutFactory } from '../utils/layout.utils';
import Tooltip from './Tooltip';
import { Data, DataKey } from '../types';
import DefaultLegend from './DefaultLegend';
import { useCategorizedData } from '../hooks';

interface HeatCalendarProps<T> {
  data: Data<T>;
  size?: number;
  title?: string;
  colors?: string[];
  className?: string;
  dataKey: DataKey<T>;
  category?: Category;
  startsAt?: string | Date;
  gutter?: [number, number];
  tooltip?: ComponentType<ComponentProps<any>>;
  node?: ComponentType<ComponentProps<typeof DefaultNode>>;
  vLabel?: ComponentType<ComponentProps<typeof VLabel>> | null;
  hLabel?: ComponentType<ComponentProps<typeof HLabel>> | null;
  legend?: ComponentType<ComponentProps<typeof DefaultLegend>> | null;
}

function HeatCalendar<T>({
  data,
  title,
  colors,
  dataKey,
  className,
  size = 10,
  gutter = [2, 2],
  startsAt = new Date(),
  tooltip: TooltipContent,
  category = Category.MONTH_DAY,
  hLabel: HLabelRenderer = HLabel,
  vLabel: VLabelRenderer = VLabel,
  node: NodeRenderer = DefaultNode,
  legend: LegendRenderer = DefaultLegend,
}: HeatCalendarProps<T>) {
  const labelsRef = useRef<SVGGElement>();
  const categorizedData = useCategorizedData(data, dataKey, category);
  const [legendWidth, setLegendWidth] = useState<number | undefined>(undefined);

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

    const pixelRation = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

    setLegendWidth(max * pixelRation);
  }, []);

  const hSpace = 3 * gutter[0];
  const vSpace = 3 * gutter[1];
  const margin = (legendWidth ?? 0) + hSpace;
  const legendHeight = LegendRenderer || title ? size + vSpace : 0;
  const hLabelsHeight = HLabelRenderer ? size / 2 + vSpace : 0;
  const canRenderContent = !VLabelRenderer || labelsRef.current;

  const viewBoxWidth = grid.width + margin + hSpace;
  const viewBoxHeight = grid.height + hLabelsHeight + legendHeight;

  return (
    <Store data={categorizedData} colors={colors} category={category}>
      <svg
        width="100%"
        className={className}
        style={{ overflow: 'visible' }}
        preserveAspectRatio="xMidYMin meet"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {canRenderContent && title && (
          <text x={hSpace} y={gutter[0]} textAnchor="start" fill="currentColor" alignmentBaseline="hanging">
            {title}
          </text>
        )}
        {canRenderContent && LegendRenderer && (
          <LegendRenderer colors={colors} x={viewBoxWidth - hSpace} y={gutter[1]} size={size} />
        )}
        {VLabelRenderer && (
          <g ref={setRef} fill={labelsRef.current ? 'currentColor' : 'transparent'}>
            {new Array(DAYS_IN_WEEK).fill(0).map((_, day) => (
              <VLabelRenderer
                key={day}
                day={day}
                size={size}
                category={category}
                x={legendWidth ?? 0}
                y={day * (size + gutter[0]) + legendHeight}
              />
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
              node={NodeRenderer}
              x={config.x + margin}
              label={HLabelRenderer}
              y={config.y + legendHeight}
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
