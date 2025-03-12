import { configureStore } from '@reduxjs/toolkit';
import componentFormReducer from './features/component-form/component-form-slice';
import reactHooksFormReducer from './features/react-hook-form/react-hook-form-slice';

export const store = configureStore({
  reducer: {
    componentForm: componentFormReducer,
    reactHooksForm: reactHooksFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
