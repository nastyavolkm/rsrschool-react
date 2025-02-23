import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './Pagination';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pagination Component', () => {
  it('changes url by click on a page', async () => {
    store.dispatch({ type: 'search/setTotalCount', payload: 200 });
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </MemoryRouter>
    );

    expect(
      await screen.findByRole('button', { name: 'Prev' })
    ).toBeInTheDocument();

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    await user.click(thirdPageButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('?page=3');
  });
});
