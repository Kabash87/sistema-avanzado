export const getPosts = (state) => state.posts;
export const getPost = (postId) => (state) =>
  getPosts(state).find((post) => post.id === +postId);

export const getTags = (state) => state.tags;
export const getAreTagsLoaded = (state) => getTags(state).length > 0;
