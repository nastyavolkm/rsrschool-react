import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectIsLoading = (state: RootState) => state.loading.isLoading;

export default loadingSlice.reducer;
