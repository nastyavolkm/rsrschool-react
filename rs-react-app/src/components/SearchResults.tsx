import React from "react";
import './SearchResults.css';
import SearchResultsItem from "./SearchResultsItem.tsx";
import { GithubRepoItemDto } from "../models/github-repo-item-dto.model.ts";
import Spinner from "./Spinner.tsx";


interface SearchResultsProps {
    results: GithubRepoItemDto[],
    isLoading: boolean,
    error: string,
    isCustomSearch: boolean,
}

class SearchResults extends React.Component<SearchResultsProps, {}> {
    render() {
        const { isLoading, error, results, isCustomSearch } = this.props;
        if (isLoading) return <Spinner/>;
        if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
        return (
            <div>
                {isCustomSearch &&
                    <div>
                        <h2>Here you can see GitHub repositories React.js related</h2>
                        <span>If you want to see other please type in search field and click Search button</span></div>}
                <div>
                    {!results?.length && <div><p>Oops! Seems like we didn't found nothing.</p><span>Try to change you request</span></div>}
                    {results.map((result, index) => (
                        <div key={index}>
                            <SearchResultsItem item={result}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchResults;
