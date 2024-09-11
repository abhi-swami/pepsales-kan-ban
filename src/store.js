import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from '../src/slices/blocksSlice';
import configReducer from '../src/slices/configSlice';
import filterReducer from '../src/slices/filterSlice';

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    config: configReducer,
    filter: filterReducer,
  },
});
