import { wrapper } from '../store/wrapper';
import { gitHubSearchApi } from '../api/services/GitHubSearchService';

export default function App() {
  return <div></div>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, q } = context.query;
    const term = (q as string) || 'react';
    const currentPage = (page as string) || '1';

    store.dispatch(
      gitHubSearchApi.endpoints.getGitHubRepoBySearchTerm.initiate({
        searchTerm: term,
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
