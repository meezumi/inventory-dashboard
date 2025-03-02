import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    make: [],
    duration: null
  },
  drawerOpen: false
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMakeFilter: (state, action) => {
      state.filters.make = action.payload;
    },
    setDurationFilter: (state, action) => {
      state.filters.duration = action.payload;
    },
    clearAllFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleFilterDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    }
  },
});

export const { 
  setMakeFilter, 
  setDurationFilter, 
  clearAllFilters,
  toggleFilterDrawer
} = filtersSlice.actions;

export default filtersSlice.reducer;