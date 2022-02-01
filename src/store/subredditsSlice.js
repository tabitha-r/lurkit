import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';

const initialState = {
    subreddits: [],
    error: false,
    isLoading: false,
};

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess(state, action) {
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFail(state) {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const {
    getSubredditsFail,
    getSubredditsSuccess,
    startGetSubreddits,
} = subredditsSlice.actions;

export default subredditsSlice.reducer;

export const fetchSubreddits = () => async (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits));
    } catch (error) {
        dispatch(getSubredditsFail());
    }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;