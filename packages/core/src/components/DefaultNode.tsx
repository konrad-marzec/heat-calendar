import { type Dim } from '../types';

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
      <rect data-testid="default-node" width={width} height={height} x={x} y={y} fill={fitToScale(value)} rx={2} />
      {/* <text x={x} y={y + 10} fill="red" fontSize={10}>
        {day}
      </text> */}
    </>
  );
}

export default DefaultNode;
