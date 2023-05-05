import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPosts, addPost, addComment, addLike } from './postsOperations';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        currentPostId: null,
    },
    reducers: {
        setCurrentPostId(state, { payload }) {
            state.currentPostId = payload;
        },
    },
    extraReducers: (buildre) =>
        buildre
            .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
                state.posts = payload;
            })
            .addCase(addPost.fulfilled, (state, { payload }) => {
                state.posts.push(payload);
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                const postIndex = state.posts.findIndex(
                    (post) => post.id === payload.currentPostId
                );
                state.posts[postIndex].comments.push(payload.comment);
            })
            .addCase(addLike.fulfilled, (state, { payload }) => {
                const postIndex = state.posts.findIndex(
                    (post) => post.id === payload
                );
                state.posts[postIndex].likesCount += 1;
            }),
});

export const { setCurrentPostId } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;