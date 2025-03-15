import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum LastUpdatedFormEnum {
  COMPONENT_FORM = 'ComponentForm',
  REACT_HOOK_FORM = 'ReactHookForm',
}
export interface LastUpdatedFormState {
  lastUpDatedForm: LastUpdatedFormEnum | null;
}

const initialState: LastUpdatedFormState = {
  lastUpDatedForm: null,
};

export const lastUpdatedFormSlice = createSlice({
  name: 'lastUpdatedForm',
  initialState,
  reducers: {
    addLastUpdatedForm: (
      state: LastUpdatedFormState,
      action: PayloadAction<LastUpdatedFormEnum>
    ) => {
      state.lastUpDatedForm = action.payload;
    },
  },
});

export const { addLastUpdatedForm } = lastUpdatedFormSlice.actions;
export const selectLastUpdatedForm = (state: RootState) =>
  state.lastUpdatedForm.lastUpDatedForm;

export default lastUpdatedFormSlice.reducer;
