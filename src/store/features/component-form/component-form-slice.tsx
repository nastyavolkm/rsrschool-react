import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ComponentFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'female' | 'male' | null;
  accept_terms: boolean;
  image: string;
  country: string;
}

const initialState: { form: ComponentFormState | null } = {
  form: null,
};

export const componentFormSlice = createSlice({
  name: 'componentForm',
  initialState,
  reducers: {
    addData: (
      state: { form: ComponentFormState },
      action: PayloadAction<ComponentFormState>
    ) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
});

export const { addData } = componentFormSlice.actions;
export const selectComponentForm = (state: RootState) => state.form;

export default componentFormSlice.reducer;
