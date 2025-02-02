import './App.css';
import React from 'react';
import Search from './components/Search.tsx';
import SearchResults from './components/SearchResults.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import { GithubRepoItemDto } from './models/github-repo-item-dto.model.ts';
import { GithubRepoResponseDto } from './models/github-repo-response-dto.model.ts';

interface AppState {
  searchTerm?: string;
  searchResults?: GithubRepoItemDto[];
  isLoading?: boolean;
  error?: string | null;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      searchResults: [],
      isLoading: false,
      error: '',
    };
  }

  async componentDidMount() {
    await this.searchItems(this.state.searchTerm);
  }

  searchItems = async (searchTerm: string | undefined) => {
    this.setState({ isLoading: true, error: null, searchTerm });

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm || 'react'}&page=0&per_page=10`
      );
      const data: GithubRepoResponseDto = await response.json();
      this.setState({ searchResults: data.items, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        this.setState({ error: 'An unknown error occurred', isLoading: false });
      }
    }
  };

  render() {
    const { searchTerm, isLoading, error, searchResults } = this.state;
    return (
      <div className="app-wrapper">
        <Search
          isLoading={Boolean(isLoading)}
          onSearch={this.searchItems}
          initialSearchTerm={searchTerm}
        />
        <SearchResults
          isCustomSearch={!searchTerm}
          results={searchResults || []}
          isLoading={Boolean(isLoading)}
          error={error || ''}
        />
        {!isLoading && <ErrorButton />}
      </div>
    );
  }
}

export default App;
