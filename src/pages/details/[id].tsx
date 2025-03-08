import { useRouter } from 'next/router';
import { wrapper } from '../../store/wrapper';
import { gitHubSearchApi } from '../../api/services/GitHubSearchService';
import { Main } from '../../components/main/Main';

export default function Details() {
  const router = useRouter();
  const id = router.query.id as string;
  return <Main id={id} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, q } = context.query;
    const { id } = context.params || {};
    const term = (q as string) || 'react';
    const currentPage = (page as string) || '1';

    store.dispatch(
      gitHubSearchApi.endpoints.getGitHubRepoBySearchTerm.initiate({
        searchTerm: term,
        page: currentPage,
      })
    );

    if (id) {
      store.dispatch(
        gitHubSearchApi.endpoints.getGitHubRepoDetailsById.initiate(
          id as string
        )
      );
    }

    await Promise.all(
      store.dispatch(gitHubSearchApi.util.getRunningQueriesThunk())
    );

    return {
      props: {},
    };
  }
);
