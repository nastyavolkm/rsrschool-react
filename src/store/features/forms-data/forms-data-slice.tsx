import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FormState } from '../../models/form.model.tsx';

const initialState: { forms: FormState[] } = {
  forms: [],
};

export const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    addFormsData: (
      state: { forms: FormState[] },
      action: PayloadAction<FormState>
    ) => {
      state.forms = [action.payload, ...state.forms];
    },
  },
});

export const { addFormsData } = formsDataSlice.actions;
export const selectFormsData = (state: RootState) => state.formsData.forms;

export default formsDataSlice.reducer;
