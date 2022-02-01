import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getPosts, getComments } from '../api/reddit';

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: '/r/all',
    selectedSubredditName: 'r/Home',
    selectedSubredditBanner: '',
    selectedSubredditColor: '',
    selectedSubredditIcon: '',
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFail(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload.url;
            state.selectedSubredditName = action.payload.display_name_prefixed;
            state.selectedSubredditBanner = action.payload.header_img;
            state.selectedSubredditColor = action.payload.primary_color;
            state.selectedSubredditIcon = action.payload.icon_img;
            state.searchTerm = '';
        },
        toggleComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        startGetComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if (!state.posts[action.payload].showingComments) {
                return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].error = false;
        },
        getCommentsSuccess(state, action) {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFail(state, action) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = true;
        },
    },
});

export const {
    setPosts,
    getPostsFail,
    getPostsSuccess,
    startGetPosts,
    setSearchTerm,
    setSelectedSubreddit,
    toggleComments,
    getCommentsFail,
    getCommentsSuccess,
    startGetComments,
} = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await getPosts(subreddit);
        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }));
        dispatch(getPostsSuccess(postsWithMetadata));
    } catch (error) {
        dispatch(getPostsFail());
    }
};

export const fetchComments = (index, link) => async (dispatch) => {
    try {
        dispatch(startGetComments(index));
        const comments = await getComments(link);
        dispatch(getCommentsSuccess({ index, comments }));
    } catch (error) {
        dispatch(getCommentsFail(index));
    }
};

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;
export const selectSelectedSubredditName = (state) => state.reddit.selectedSubredditName;
export const selectSelectedSubredditBanner = (state) => state.reddit.selectedSubredditBanner;
export const selectSelectedSubredditColor = (state) => state.reddit.selectedSubredditColor;
export const selectSelectedSubredditIcon = (state) => state.reddit.selectedSubredditIcon;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== '') {
            return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        return posts;
    }
);