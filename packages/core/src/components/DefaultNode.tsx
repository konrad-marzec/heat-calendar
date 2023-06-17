import { Dim } from '../types';

interface DefaultNodeProps extends Dim {
  day?: number;
  year: number;
  week?: number;
  value: number;
  month?: number;
  fitToScale: (value?: number | null) => string | undefined;
}

function DefaultNode({ x, y, value, width, height, fitToScale }: DefaultNodeProps) {
  return (
    <>
      <rect width={width} height={height} x={x} y={y} fill={fitToScale(value)} rx={2} />
    </>
  );
}

export default DefaultNode;
