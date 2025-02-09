import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';
import { Route, Routes } from 'react-router';

const mockData = {
  items: [
    { id: 1, name: 'repo1', forks: 10 },
    { id: 2, name: 'repo2', forks: 5 },
  ],
  total_count: 2,
};

describe('Main Component', () => {
  it('renders without crashing', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(await screen.findByText('repo1')).toBeInTheDocument();
    expect(await screen.findByText('repo2')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('An unknown error occurred'))
    ) as jest.Mock;

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Error: An unknown error occurred')
    ).toBeInTheDocument();
  });
});
