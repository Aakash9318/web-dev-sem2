import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrains } from '../services/api';

export const searchTrains = createAsyncThunk(
  'trains/search',
  async ({ source, destination, date }) => {
    const response = await fetchTrains(source, destination, date);
    return response;
  }
);

const trainSlice = createSlice({
  name: 'trains',
  initialState: {
    results: [],
    loading: false,
    error: null,
    filters: {
      class: 'All', // 1A, 2A, 3A, SL, All
      maxPrice: 10000,
    },
    sortBy: 'departureTime', // departureTime, price, duration
  },
  reducers: {
    setFilterClass: (state, action) => {
      state.filters.class = action.payload;
    },
    setFilterMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateLiveStatus: (state, action) => {
      const { trainNo, status } = action.payload;
      const train = state.results.find(t => t.trainNo === trainNo);
      if (train) {
        train.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilterClass, setFilterMaxPrice, setSortBy, updateLiveStatus } = trainSlice.actions;
export default trainSlice.reducer;
