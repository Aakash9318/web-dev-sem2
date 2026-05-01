import { createSlice } from '@reduxjs/toolkit';

const loadWatchlist = () => {
  try {
    const serializedState = localStorage.getItem('railway_watchlist');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveWatchlist = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('railway_watchlist', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: loadWatchlist()
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const train = action.payload;
      if (!state.items.find(t => t.trainNo === train.trainNo)) {
        state.items.push(train);
        saveWatchlist(state.items);
      }
    },
    removeFromWatchlist: (state, action) => {
      const trainNo = action.payload;
      state.items = state.items.filter(t => t.trainNo !== trainNo);
      saveWatchlist(state.items);
    }
  }
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
