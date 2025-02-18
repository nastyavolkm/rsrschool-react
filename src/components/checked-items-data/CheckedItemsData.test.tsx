import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Main } from '../main/Main';
import { ThemeProvider } from '../../context/ThemeProvider';
import { Routes } from 'react-router';

const mockData = {
  items: [
    { id: 1, name: 'repo1', forks: 10 },
    { id: 2, name: 'repo2', forks: 5 },
  ],
  total_count: 2,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
) as jest.Mock;

describe('CheckedItemsData Component', () => {
  it('shows number of selected items', async () => {
    const user = userEvent.setup();
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
    expect(await screen.findByText('repo1')).toBeInTheDocument();
    expect(await screen.findByText('repo2')).toBeInTheDocument();
    await user.click(screen.getByTestId('checkbox-1'));

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });
});
