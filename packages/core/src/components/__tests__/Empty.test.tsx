import { render } from '@testing-library/react';

import Empty from '../Empty';

describe('Empty', () => {
  it('should render nothing', () => {
    const { container } = render(<Empty />);

    expect(container).toBeEmptyDOMElement();
  });
});
