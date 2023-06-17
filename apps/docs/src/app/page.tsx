'use client';

import { HeatCalendar } from 'core';
import { data } from './data';
import { useCallback } from 'react';

const COLORS = ['#CCDBDC', '#9AD1D4', '#C7F9CC', '#DBFF76', '#B6DC76', '#80CED7', '#57CC99', '#007EA7', '#003249'];
const ORANGE_COLORS = ['#7a7672', '#e0c599', '#e2a458', '#d46b08', '#873800'];
const GREEN_COLORS = ['#5e5e56', '#7cb305', '#5b8c00', '#3f6600'];

const container = {
  padding: 16,
  color: 'white',
  borderRadius: 6,
  marginBottom: 16,
  background: '#343434',
};

export default function Page() {
  const dataKey = useCallback((val: number | undefined, item: number[]) => val ?? 0 + item[1], []);
  const dataKey1 = useCallback((val: number | undefined, item: number[]) => Math.max(val ?? 0, item[0]), []);

  return (
    <>
      <div style={container}>
        <HeatCalendar size={40} gutter={[5, 5]} data={data} dataKey={dataKey} startsAt={'2015-12-04'} colors={COLORS} />
      </div>

      <div style={container}>
        <HeatCalendar
          data={data}
          hLabel={null}
          vLabel={null}
          gutter={[2, 2]}
          dataKey={dataKey}
          startsAt="2013-2-04"
          colors={ORANGE_COLORS}
        />
      </div>

      <div style={container}>
        <HeatCalendar
          size={20}
          data={data}
          dataKey={dataKey}
          startsAt="2014-05-04"
          colors={ORANGE_COLORS}
          vLabel={({ y, day }: any) => (
            <text x={0} y={y} fontSize={20} fill="currentColor" textAnchor="start" alignmentBaseline="text-before-edge">
              - {day + 1} -
            </text>
          )}
          hLabel={({ x, y }: any) => (
            <text x={x} y={y} fill="currentColor" fontSize={10} textAnchor="middle" alignmentBaseline="hanging">
              &#128197;
            </text>
          )}
        />
      </div>

      <div style={container}>
        <HeatCalendar data={data} hLabel={null} dataKey={dataKey1} startsAt="2014-05-04" colors={GREEN_COLORS} />
      </div>

      <div style={container}>
        <HeatCalendar data={data} dataKey={dataKey} startsAt="2014-05-04" colors={GREEN_COLORS} />
      </div>

      <div style={container}>
        <HeatCalendar data={data} category="week" dataKey={dataKey} startsAt="2014-05-27" colors={GREEN_COLORS} />
      </div>
    </>
  );
}
