import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FormState } from '../../models/form.model.tsx';
import { ReactFormModel } from '../../models/react-form.model.ts';

const initialState: { forms: (FormState | ReactFormModel)[] } = {
  forms: [],
};

export const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    addFormsData: (
      state: { forms: (FormState | ReactFormModel)[] },
      action: PayloadAction<FormState | ReactFormModel>
    ) => {
      state.forms = [action.payload, ...state.forms];
    },
  },
});

export const { addFormsData } = formsDataSlice.actions;
export const selectFormsData = (state: RootState) => state.formsData.forms;

export default formsDataSlice.reducer;
