import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/search-slice';
import loadingReducer from './features/loading/loading-slice';
import checkedItemsReducer from './features/checked-items/checked-items-slice';
import { gitHubSearchApi } from '../api/services/GitHubSearchService';

export const reducer = {
  [gitHubSearchApi.reducerPath]: gitHubSearchApi.reducer,
  checkedItems: checkedItemsReducer,
  search: searchReducer,
  loading: loadingReducer,
};

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gitHubSearchApi.middleware),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = {
  [K in keyof typeof reducer]: ReturnType<(typeof reducer)[K]>;
};
export type AppDispatch = AppStore['dispatch'];
