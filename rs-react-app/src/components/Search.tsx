import React from "react";
import './Search.css';

type SearchState = {
    searchTerm: string;
}

type SearchProps = {
    onSearch: (searchTerm: string) => void,
    initialSearchTerm?: string,
}

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.initialSearchTerm || '',
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleSearch = async () => {
        localStorage.setItem('searchTerm', this.state.searchTerm);
        this.props.onSearch(this.state.searchTerm);
    }

    render() {
        return <div>
            <input
                defaultValue={this.state.searchTerm}
                onInput={this.handleInputChange}
            />
            <button
                onClick={this.handleSearch}
            >Search
            </button>
        </div>;
    }
}

export default Search;
