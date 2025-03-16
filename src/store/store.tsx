import { configureStore } from '@reduxjs/toolkit';
import formsDataReducer from './features/forms-data/forms-data-slice.tsx';
import countriesReducer from './features/countries/countries-slice';

export const store = configureStore({
  reducer: {
    formsData: formsDataReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
