import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../../context/ThemeProvider';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination Component', () => {
  it('changes url by click on a page', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'search/setTotalCount', payload: 200 });
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Pagination totalItems={200} />
      </Provider>
    );

    expect(
      await screen.findByRole('button', { name: 'Prev' })
    ).toBeInTheDocument();

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    await user.click(thirdPageButton);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '3' },
    });
  });

  it('shifts to next window when clicking Next', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={100} />
        </ThemeProvider>
      </Provider>
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '1' })
      ).not.toBeInTheDocument();
    });
  });

  it('hides Prev and Next when total pages are less than or equal to MAX_PAGES_VISIBLE', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={50} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.queryByRole('button', { name: 'Prev' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Next' })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });
});
