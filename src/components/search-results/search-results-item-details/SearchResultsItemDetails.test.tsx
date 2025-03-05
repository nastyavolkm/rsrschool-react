import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchResultsItemDetails } from './SearchResultsItemDetails';
import { server } from '../../../../tests/server';
import { http, HttpResponse } from 'msw';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../context/ThemeProvider';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchResultsItemDetails Component', () => {
  it('displays the detailed card data after fetching', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/details/123',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResultsItemDetails id="123" />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Test Repo')).toBeInTheDocument();
    expect(await screen.findByText('Test Description')).toBeInTheDocument();
    expect(await screen.findByText('Forks: 10')).toBeInTheDocument();
    expect(await screen.findByText('Visibility: public')).toBeInTheDocument();
    expect(await screen.findByText('Owner: testuser')).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: 'Link to repo' })
    ).toHaveAttribute('href', 'https://example.com/testrepo');
  });

  it('navigates away when clicking the close button', async () => {
    const mockRouter = {
      query: { page: '3' },
      push: jest.fn(),
      pathname: '/details/123',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResultsItemDetails id="123" />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Test Repo')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '3' },
    });
  });

  it('show error if returns error message', async () => {
    const mockRouter = {
      query: { page: '3' },
      push: jest.fn(),
      pathname: '/details/345',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    server.use(
      http.get('https://api.github.com/repositories/345', () => {
        return HttpResponse.json({
          status: 404,
          message: 'not found',
        });
      })
    );
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResultsItemDetails id="345" />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Error: not found')).toBeInTheDocument();
  });

  it('show error if error occurs', async () => {
    const mockRouter = {
      query: { page: '3' },
      push: jest.fn(),
      pathname: '/details/346',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    server.use(
      http.get('https://api.github.com/repositories/346', () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'not found',
        });
      })
    );
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResultsItemDetails id="346" />
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText('Error: Something went wrong')
    ).toBeInTheDocument();
  });
});
