import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Main Component', () => {
  it('renders without crashing', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    store.dispatch({ type: 'search/setSearchTerm', payload: 'angular' });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main>
            <div></div>
          </Main>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('displays checkedItemsComponent', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'checkedItems/addItems', payload: { id: 1 } });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main>
            <div></div>
          </Main>
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('1 item is selected')).toBeInTheDocument();
  });
});
