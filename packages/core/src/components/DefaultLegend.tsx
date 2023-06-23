import { useMemo } from 'react';

import { type Point } from '../types';

interface DefaultLegendProps extends Point {
  size: number;
  colors?: string[];
}

function DefaultLegend({ x, y, size, colors }: DefaultLegendProps) {
  const gradients = useMemo(() => colors?.map((color, idx) => [color, colors[idx + 1] || color]), [colors]);

  if (!colors || !gradients) {
    return null;
  }

  const {length} = colors;

  return (
    <>
      <defs>
        {gradients.map(([from, to], idx) => (
          <linearGradient key={`${from}-${idx}`} id={`gradient-${from}-${to}`}>
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        ))}
      </defs>
      {gradients.map(([from, to], idx) => (
        <rect
          y={y}
          key={idx}
          width={size}
          height={size / 2}
          x={x - size * (length - idx)}
          fill={`url(#gradient-${from}-${to})`}
        />
      ))}
    </>
  );
}

export default DefaultLegend;
