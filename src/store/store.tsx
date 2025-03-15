import { configureStore } from '@reduxjs/toolkit';
import componentFormReducer from './features/component-form/component-form-slice';
import reactHooksFormReducer from './features/react-hook-form/react-hook-form-slice';
import countriesReducer from './features/countries/countries-slice';
import lastUpdatedFormReducer from './features/last-updated-form/last-updated-form-slice';

export const store = configureStore({
  reducer: {
    componentForm: componentFormReducer,
    reactHooksForm: reactHooksFormReducer,
    countries: countriesReducer,
    lastUpdatedForm: lastUpdatedFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
