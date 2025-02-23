import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { MemoryRouter } from 'react-router';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Search Component', () => {
  it('clicking the search button set searchTerm to props', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Search />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', { name: 'Search' });
    await user.type(input, 'react');
    await user.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('?page=1');
  });

  it('takes an input value from store', async () => {
    store.dispatch({ type: 'searchTerm/setSearchTerm', payload: 'react' });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Search />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue('react');
  });

  it('input and button should be disabled if isLoading', async () => {
    store.dispatch({ type: 'loading/setLoading', payload: true });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Search />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(await screen.findByRole('textbox')).toHaveAttribute('disabled');
    expect(await screen.findByRole('button')).toHaveAttribute('disabled');
  });
});
