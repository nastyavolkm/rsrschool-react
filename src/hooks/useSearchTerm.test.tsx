import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useSearchTerm from './useSearchTerm';
import userEvent from '@testing-library/user-event';

const TestComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        data-testid="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div data-testid="search-output">{searchTerm}</div>
    </div>
  );
};

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn().mockReturnValue(''),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

describe('useSearchTerm with TestComponent', () => {
  it('renders and updates search term correctly', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const input = screen.getByTestId('search-input');
    const output = screen.getByTestId('search-output');

    await user.type(input, 'r');

    expect(output).toHaveTextContent('r');

    expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'r');
  });

  it('loads initial term from local storage', () => {
    localStorage.getItem = jest.fn().mockReturnValue('react');

    render(<TestComponent />);

    expect(screen.getByTestId('search-output')).toHaveTextContent('react');
  });
});
