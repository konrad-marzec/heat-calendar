import { Category } from '../constants/layout.constants';
import { WEEKS_IN_YEAR } from '../constants/week.constants';
import { useStoreValue } from '../model/Store';
import { getMonthName } from '../utils/months.utils';

interface HLabelProps {
  x: number;
  y: number;
  size: number;
  value: number;
}

function HLabel({ x, y, value, size }: HLabelProps) {
  const category = useStoreValue((store) => store.category);

  if (category === Category.WEEK) {
    if (value % 4 !== 1 && value !== WEEKS_IN_YEAR) {
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
