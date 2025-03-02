import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventory/inventorySlice';
import filtersReducer from './features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    filters: filtersReducer,
  },
});