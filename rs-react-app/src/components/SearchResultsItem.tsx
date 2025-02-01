import React from "react";
import { GithubRepoItemDto } from "../models/github-repo-item-dto.model.ts";

type  SearchResultsItemProps = {
    item: GithubRepoItemDto,
}

class SearchResultsItem extends React.Component<SearchResultsItemProps, {}> {
  render() {
      const { item } = this.props;
    return (
      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    );
  }
}

export default SearchResultsItem;
