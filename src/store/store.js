import { configureStore, combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';
import subredditReducer from './subredditsSlice';
import postsReducer from './postsSlice';
import pinnedSubredditsReducer from './pinnedSubredditsSlice';

export const store = configureStore({
  reducer: combineReducers({
    darkMode: darkModeReducer,
    reddit: postsReducer,
    subreddits: subredditReducer,
    pinnedSubreddits: pinnedSubredditsReducer,
  }),
});
