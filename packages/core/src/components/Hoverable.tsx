import { MouseEvent, ReactNode, useCallback } from 'react';
import { useSetStore } from '../model/Store';

interface HoverableProps<T> {
  children: ReactNode;
  data?: T;
}

function Hoverable<T>({ data, children }: HoverableProps<T>) {
  const set = useSetStore();

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      set({ tooltip: [data, { x: e.pageX, y: e.pageY }] });
    },
    [set, data],
  );

  const onMouseLeave = useCallback(() => {
    set({ tooltip: undefined });
  }, [set]);

  return (
    <g onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </g>
  );
}

export default Hoverable;
