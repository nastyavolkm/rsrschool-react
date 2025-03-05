import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Main } from '../main/Main';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CheckedItemsData Component', () => {
  it('shows number of selected items', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const user = userEvent.setup();
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
    expect(await screen.findByText('repo1')).toBeInTheDocument();
    expect(await screen.findByText('repo2')).toBeInTheDocument();
    await user.click(screen.getByTestId('checkbox-1'));

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });
});
