import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Search Component', () => {
  it('clicking the search button set searchTerm to props', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>
    );

    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', { name: 'Search' });
    await user.type(input, 'react');
    await user.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '1', q: 'react' },
    });
  });

  it('takes an input value from router', async () => {
    const mockRouter = {
      query: { page: '2', q: 'angular' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>
    );
    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue('angular');
  });

  it('input and button should be disabled if isLoading', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'loading/setLoading', payload: true });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>
    );
    expect(await screen.findByRole('textbox')).toHaveAttribute('disabled');
    expect(await screen.findByRole('button')).toHaveAttribute('disabled');
  });
});
