import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
describe('Spinner Component', () => {
  it('should have 404 heading', () => {
    render(<Spinner />);

    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
