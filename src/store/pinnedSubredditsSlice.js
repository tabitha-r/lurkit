import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pinnedSubreddits: [],
}

const newId = (state) => {
    if (state.pinnedSubreddits.length === 0) {
        return 1;
    } else {
        const highestId = state.pinnedSubreddits[state.pinnedSubreddits.length - 1].id;
        return highestId + 1;
    }
}

const pinnedSubredditSlice = createSlice({
    name: 'pinnedSubreddits',
    initialState,
    reducers: {
        addPin(state, action) {
            state.pinnedSubreddits.push({
                id: newId(state),
                url: action.payload.url,
                color: action.payload.color,
                img: action.payload.img,
                name: action.payload.name,
            });
        },
        removePin(state, action) {
            state.pinnedSubreddits = state.pinnedSubreddits.filter(subreddit => subreddit.url !== action.payload);
        },
    }
});

export const { addPin, removePin } = pinnedSubredditSlice.actions;

export default pinnedSubredditSlice.reducer;
export const selectPinnedSubreddits = (state) => state.pinnedSubreddits.pinnedSubreddits;