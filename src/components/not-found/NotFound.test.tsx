import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('should have 404 heading', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
