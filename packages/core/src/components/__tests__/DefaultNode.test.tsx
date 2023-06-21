import { render, screen } from '@testing-library/react';

import DefaultNode from '../DefaultNode';

const fitToScale = jest.fn(() => '#fff');

describe('DefaultNode', () => {
  it('should render svg rect', () => {
    render(
      <DefaultNode
        x={10}
        y={15}
        day={11}
        width={5}
        month={0}
        value={69}
        height={4}
        year={1994}
        fitToScale={fitToScale}
      />,
      { wrapper: (props) => <svg {...props} /> },
    );

    const element = screen.getByTestId('default-node');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('fill', '#fff');
    expect(element).toHaveAttribute('x', '10');
    expect(element).toHaveAttribute('y', '15');
    expect(element).toHaveAttribute('width', '5');
    expect(element).toHaveAttribute('height', '4');
  });
});
