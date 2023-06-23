import React, { type ReactElement } from 'react';
import { createPortal } from 'react-dom';

import { useStoreValue } from '../model/Store';

interface TooltipProps {
  children: ReactElement;
}

function Tooltip({ children }: TooltipProps) {
  const tooltip = useStoreValue((store) => store.tooltip);

  if (!tooltip) {
    return null;
  }

  const [data, coordinates] = tooltip;

  return createPortal(
    <div
      role="tooltip"
      style={{
        top: 0,
        left: 0,
        position: 'absolute',
        transform: `translate(${coordinates.x + 10}px, ${coordinates.y + 25}px)`,
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          data,
        }),
      )}
    </div>,
    document.body,
  );
}

export default Tooltip;
