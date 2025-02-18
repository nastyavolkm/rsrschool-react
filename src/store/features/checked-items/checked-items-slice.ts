import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';

export interface CheckedItemsState {
  items: GithubRepoItemDto[];
}

const initialState: { items: GithubRepoItemDto[] } = {
  items: [],
};

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<GithubRepoItemDto>) => {
      state.items = [...state.items, action.payload];
    },
    removeItems: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItems, removeItems, resetItems } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
