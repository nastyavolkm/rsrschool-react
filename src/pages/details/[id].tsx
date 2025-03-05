import { useRouter } from 'next/router';
import { SearchResultsItemDetails } from '../../components/search-results/search-results-item-details/SearchResultsItemDetails';
import { wrapper } from '../../store/wrapper';
import { gitHubSearchApi } from '../../api/services/GitHubSearchService';

export default function Details() {
  const router = useRouter();
  const id = router.query.id as string;
  return <SearchResultsItemDetails id={id} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params || {};

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
