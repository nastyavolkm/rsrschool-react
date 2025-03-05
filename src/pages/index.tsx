import { wrapper } from '../store/wrapper';
import { gitHubSearchApi } from '../api/services/GitHubSearchService';

export default function App() {
  return <div></div>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const searchTerm = store.getState().search.searchTerm || 'react';
    const currentPage = store.getState().search.currentPage || '1';

    store.dispatch(
      gitHubSearchApi.endpoints.getGitHubRepoBySearchTerm.initiate({
        searchTerm,
        page: currentPage,
      })
    );

    await Promise.all(
      store.dispatch(gitHubSearchApi.util.getRunningQueriesThunk())
    );
    return {
      props: {},
    };
  }
);
