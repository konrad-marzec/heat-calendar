import { Point } from '../types';

interface DayNameProps extends Point {
  day: number;
  size: number;
}

function DayName({ x, y, day, size }: DayNameProps) {
  if (day % 2 === 0) {
    return null;
  }

  return (
    <text
      x={x}
      y={y + size / 4}
      fill="currentColor"
      fontSize={size / 2}
      alignmentBaseline="hanging"
      textAnchor={x ? 'end' : 'start'}
    >
      {new Intl.DateTimeFormat(typeof navigator === 'undefined' ? 'en-US' : navigator.language, {
        weekday: 'long',
      }).format(new Date(2023, 7, day))}
    </text>
  );
}

export default DayName;
