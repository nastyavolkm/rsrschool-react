import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

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
        <Pagination />
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
});
