import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ['Belarus', 'Russia', 'Ukraine', 'Poland', 'Germany', 'Georgia'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state: CountriesState, action: PayloadAction<string>) => {
      state.countries.push(action.payload);
    },
  },
});

export const selectCountries = (state: RootState) => state.countries.countries;

export default countriesSlice.reducer;
