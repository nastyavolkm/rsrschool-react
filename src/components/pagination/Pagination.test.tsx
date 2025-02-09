import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pagination Component', () => {
  it('changes url by click on a page', async () => {
    const user = userEvent.setup();
    const handlePageChange = jest.fn();
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination
          itemsPerPage={5}
          totalItems={70}
          paginate={handlePageChange}
        />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole('button', { name: 'Prev' })
    ).toBeInTheDocument();

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    await user.click(thirdPageButton);

    expect(handlePageChange).toHaveBeenCalledWith(3);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('?page=3');
  });
});
