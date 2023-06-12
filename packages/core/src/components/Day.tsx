interface DayProps {
  x: number;
  y: number;
  day: number;
  size: number;
  year: number;
  month: number;
  value: number;
  fitToScale: (value?: number | null) => string | undefined;
}

function Day({ x, y, value, size, fitToScale }: DayProps) {
  return <rect width={size} height={size} x={x} y={y} fill={fitToScale(value)} rx={2} />;
}

export default Day;
