import { type ComponentProps, type ComponentType } from 'react';

import type DefaultNode from './DefaultNode';
import type HLabel from './HLabel';
import Hoverable from './Hoverable';
import { useHeatMapScale } from '../hooks';
import { useStoreValue } from '../model/Store';
import { type Dim } from '../types';
import { formatWeek } from '../utils/date.utils';

interface WeekOfTheYearProps extends Dim {
  size: number;
  year: number;
  week: number;
  gutter: [number, number];
  node: ComponentType<ComponentProps<typeof DefaultNode>>;
  label: ComponentType<ComponentProps<typeof HLabel>> | null;
}

function WeekOfTheYear({
  x: originX,
  y: originY,
  year,
  week,
  size,
  width,
  height,
  gutter,
  node: Week,
  label: Label,
}: WeekOfTheYearProps) {
  const fitToScale = useHeatMapScale();
  const heat = useStoreValue((store) => store.heatMap);
  const date = formatWeek(year, week + 1);
  const value = heat.get(date);

  const data = {
    week,
    year,
    value,
  };

  return (
    <g x={originX} y={originY}>
      <Hoverable data={data}>
        <Week
          year={year}
          week={week}
          x={originX}
          y={originY}
          value={value}
          width={width}
          height={height}
          fitToScale={fitToScale}
        />
      </Hoverable>
      {Label && <Label x={originX + width / 2} y={originY + height + 3 * gutter[1]} size={size} value={week} />}
    </g>
  );
}

export default WeekOfTheYear;
