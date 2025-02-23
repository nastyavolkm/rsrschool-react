import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton Component', () => {
  it('should throw error by click', async () => {
    const user = userEvent.setup();
    console.error = jest.fn();
    render(
      <ErrorBoundary>
        <ErrorButton></ErrorButton>
      </ErrorBoundary>
    );
    const button = screen.getByRole('button', {
      name: 'Click me to throw an error',
    });
    await user.click(button);
    expect(
      screen.getByText('Error: Manually triggered error!')
    ).toBeInTheDocument();
  });
});
