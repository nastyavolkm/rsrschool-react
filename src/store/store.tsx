import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/search-slice';
import loadingReducer from './features/loading/loading-slice';
import checkedItemsReducer from './features/checked-items/checked-items-slice';
import { gitHubSearchApi } from '../api/services/GitHubSearchService';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [gitHubSearchApi.reducerPath]: gitHubSearchApi.reducer,
      checkedItems: checkedItemsReducer,
      search: searchReducer,
      loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gitHubSearchApi.middleware),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
