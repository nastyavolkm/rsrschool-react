import { render, screen } from '@testing-library/react';
import { Providers } from './Providers';
import { ReactNode } from 'react';

jest.mock('../error-boundary/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('Providers Component', () => {
  it('renders children within all providers', () => {
    const TestChild = () => <div data-testid="test-child">Hello World</div>;

    render(
      <Providers>
        <TestChild />
      </Providers>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
