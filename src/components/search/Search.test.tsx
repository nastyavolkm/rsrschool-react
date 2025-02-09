import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search Component', () => {
  it('clicking the search button set searchTerm to props', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(
      <Search isLoading={false} onSearch={handleSearch} initialSearchTerm="" />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });
    await user.type(input, 'react');
    await user.click(button);

    expect(handleSearch).toHaveBeenCalledWith('react');
  });

  it('takes an input value from props', async () => {
    render(
      <Search isLoading={false} onSearch={() => {}} initialSearchTerm="react" />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('react');
  });

  it('input and button should be disabled if isLoading', async () => {
    render(
      <Search isLoading={true} onSearch={() => {}} initialSearchTerm="react" />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
