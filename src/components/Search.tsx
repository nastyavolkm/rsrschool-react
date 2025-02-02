import React from 'react';
import './Search.css';

type SearchState = {
  searchTerm: string;
};

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
  isLoading: boolean;
};

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: this.props.initialSearchTerm || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className="search">
        <input
          disabled={this.props.isLoading}
          className="search-input"
          defaultValue={this.state.searchTerm}
          onInput={this.handleInputChange}
        />
        <button
          disabled={this.props.isLoading}
          className="search-button"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
