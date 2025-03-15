import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FormState } from '../../models/form.model.tsx';

const initialState: { form: FormState | null } = {
  form: null,
};

export const componentFormSlice = createSlice({
  name: 'componentForm',
  initialState,
  reducers: {
    addComponentFormData: (
      state: { form: FormState | null },
      action: PayloadAction<FormState>
    ) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
});

export const { addComponentFormData } = componentFormSlice.actions;
export const selectComponentForm = (state: RootState) =>
  state.componentForm.form;

export default componentFormSlice.reducer;
