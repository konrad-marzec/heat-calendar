import { getMonthName } from '../utils/months.utils';

interface MonthNameProps {
  x: number;
  y: number;
  size: number;
  month: number;
}

function MonthName({ x, y, month, size }: MonthNameProps) {
  return (
    <text x={x} y={y} fill="currentColor" fontSize={size / 2} textAnchor="middle" alignmentBaseline="hanging">
      {getMonthName(month, typeof navigator === 'undefined' ? 'en-US' : navigator.language)}
    </text>
  );
}

export default MonthName;
