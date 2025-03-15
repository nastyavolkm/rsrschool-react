import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FormState } from '../../models/form.model.tsx';

const initialState: { form: FormState | null } = {
  form: null,
};

export const reactHookFormSlice = createSlice({
  name: 'componentForm',
  initialState,
  reducers: {
    addReactHooksData: (
      state: { form: FormState | null },
      action: PayloadAction<FormState>
    ) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
});

export const { addReactHooksData } = reactHookFormSlice.actions;
export const selectReactHookForm = (state: RootState) =>
  state.reactHooksForm.form;

export default reactHookFormSlice.reducer;
