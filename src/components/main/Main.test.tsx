import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { Main } from './Main';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('Main Component', () => {
  it('renders without crashing', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Main />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('displays checkedItemsComponent', async () => {
    store.dispatch({ type: 'checkedItems/addItems', payload: { id: 1 } });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Main />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText('1 item is selected')).toBeInTheDocument();
  });
});
