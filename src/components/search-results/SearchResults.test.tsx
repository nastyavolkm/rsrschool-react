import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { MemoryRouter } from 'react-router';

describe('SearchResults Component', () => {
  it('should display the spinner when loading', () => {
    render(
      <SearchResults
        results={[]}
        isLoading={true}
        error=""
        isCustomSearch={false}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Loading...' })
    ).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    const errorMessage = 'Network Error';
    render(
      <SearchResults
        results={[]}
        isLoading={false}
        error={errorMessage}
        isCustomSearch={false}
      />
    );
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should display no results message when results array is empty', () => {
    render(
      <SearchResults
        results={[]}
        isLoading={false}
        error=""
        isCustomSearch={false}
      />
    );
    expect(screen.getByText(/we found nothing/i)).toBeInTheDocument();
  });

  it('should correctly render the list of results', () => {
    const mockResults: GithubRepoItemDto[] = [
      {
        id: 1,
        name: 'Repo 1',
        description: 'A cool repo',
        svn_url: 'http://example.com/1',
      },
      {
        id: 2,
        name: 'Repo 2',
        description: 'Another cool repo',
        svn_url: 'http://example.com/2',
      },
    ] as unknown as GithubRepoItemDto[];
    render(
      <MemoryRouter>
        <SearchResults
          results={mockResults}
          isLoading={false}
          error=""
          isCustomSearch={false}
        />
      </MemoryRouter>
    );

    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items.length).toBe(2);
    expect(screen.getByText('Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Repo 2')).toBeInTheDocument();
  });

  it('should display custom search hint when in custom search mode', () => {
    render(
      <SearchResults
        results={[]}
        isLoading={false}
        error=""
        isCustomSearch={true}
      />
    );
    expect(
      screen.getByText(
        /here you can see all possible react.js related repositories/i
      )
    ).toBeInTheDocument();
  });
});
