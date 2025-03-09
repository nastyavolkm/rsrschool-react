import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { RootState } from '../../store';

type SearchItemsState = {
  searchItems: GithubRepoItemDto[];
  detailedItem: GithubRepoItemDto | { message: string } | null;
  totalCount: number;
};

const initialState: SearchItemsState = {
  searchItems: [],
  detailedItem: null,
  totalCount: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchItems: (
      state: SearchItemsState,
      action: PayloadAction<GithubRepoItemDto[]>
    ) => {
      state.searchItems = action.payload;
    },
    setTotalCount: (state: SearchItemsState, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setDetailedItem: (
      state: SearchItemsState,
      action: PayloadAction<GithubRepoItemDto | { message: string }>
    ) => {
      state.detailedItem = action.payload;
    },
  },
});

export const { setSearchItems, setTotalCount, setDetailedItem } =
  searchSlice.actions;
export const selectSearchItems = (state: RootState) => state.search.searchItems;
export const selectTotalCount = (state: RootState) => state.search.totalCount;
export default searchSlice.reducer;
