import { Category } from '../constants/layout.constants';
import { useStoreValue } from '../model/Store';
import { Point } from '../types';
import { getMonthName } from '../utils/months.utils';

interface HLabelProps extends Point {
  size: number;
  value: number;
}

function HLabel({ x, y, value, size }: HLabelProps) {
  const category = useStoreValue((store) => store.category);

  if (category === Category.WEEK_DAY || category === Category.WEEK) {
    if (value % 2 !== 1) {
      return null;
    }

    return (
      <text x={x} y={y} fill="currentColor" fontSize={size / 2} textAnchor="middle" alignmentBaseline="hanging">
        {value}
      </text>
    );
  }

  return (
    <text x={x} y={y} fill="currentColor" fontSize={size / 2} textAnchor="middle" alignmentBaseline="hanging">
      {getMonthName(value, typeof navigator === 'undefined' ? 'en-US' : navigator.language)}
    </text>
  );
}

export default HLabel;
