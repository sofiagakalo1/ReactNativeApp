const selectPosts = (state) => state.posts;

const selectCurrentPostId = (state) => state.posts.currentPostId;

export { selectPosts, selectCurrentPostId };