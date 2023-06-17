import { Dim } from '../types';

interface DayProps extends Dim {
  day: number;
  year: number;
  month: number;
  value: number;
  fitToScale: (value?: number | null) => string | undefined;
}

function Day({ x, y, value, width, height, day, fitToScale }: DayProps) {
  return (
    <>
      <rect width={width} height={height} x={x} y={y} fill={fitToScale(value)} rx={2} />
    </>
  );
}

export default Day;
