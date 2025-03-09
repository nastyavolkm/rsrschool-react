import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../context/ThemeProvider';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { DetailsCloseButton } from './details-close-button';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('DetailsCloseButton Component', () => {
  it('navigates away when clicking the close button', async () => {
    const mockPush = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
      toString: () => 'page=2&q=angular',
    });
    (useParams as jest.Mock).mockReturnValue({
      id: '123',
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailsCloseButton />
        </ThemeProvider>
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?page=2&q=angular');
  });
});
