import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('should show error if child has error', () => {
    console.error = jest.fn();
    const Child = () => {
      throw new Error('error');
    };

    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Error: error')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  it('should render child component if there are no errors', () => {
    render(
      <ErrorBoundary>
        <button>Click</button>
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });
});
