import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ReactHookFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'female' | 'male' | null;
  accept_terms: boolean;
  image: string;
  country: string;
}

const initialState: { form: ReactHookFormState | null } = {
  form: null,
};

export const reactHookFormSlice = createSlice({
  name: 'componentForm',
  initialState,
  reducers: {
    addData: (
      state: { form: ReactHookFormState },
      action: PayloadAction<ReactHookFormState>
    ) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
});

export const { addData } = reactHookFormSlice.actions;
export const selectComponentForm = (state: RootState) => state.form;

export default reactHookFormSlice.reducer;
