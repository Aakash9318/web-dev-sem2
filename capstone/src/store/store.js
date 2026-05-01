import { configureStore } from '@reduxjs/toolkit';
import trainReducer from './trainSlice';
import watchlistReducer from './watchlistSlice';

export const store = configureStore({
  reducer: {
    trains: trainReducer,
    watchlist: watchlistReducer,
  },
});
