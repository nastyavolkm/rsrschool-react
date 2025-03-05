import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { RootState } from '../../store';

type SearchItemsState = {
  searchTerm: string;
  currentPage: string;
  searchItems: GithubRepoItemDto[];
  detailedItem: GithubRepoItemDto | { message: string } | null;
  totalCount: number;
};

const initialState: SearchItemsState = {
  searchTerm: '',
  currentPage: '1',
  searchItems: [],
  detailedItem: null,
  totalCount: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state: SearchItemsState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPage: (state: SearchItemsState, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
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

export const {
  setSearchTerm,
  setPage,
  setSearchItems,
  setTotalCount,
  setDetailedItem,
} = searchSlice.actions;
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectCurrentPage = (state: RootState) => state.search.currentPage;
export const selectSearchItems = (state: RootState) => state.search.searchItems;
export const selectTotalCount = (state: RootState) => state.search.totalCount;
export default searchSlice.reducer;
