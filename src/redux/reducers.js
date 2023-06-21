import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  POSTS_LOADED,
  POST_CREATED,
  POST_INFO,
  UI_RESET_ERROR,
  TAGS_LOADED,
} from "./types";

export const defaultState = {
  auth: false,
  posts: [],
  tags: [],
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS /**Sesion Iniciada */:
      return true;
    case AUTH_LOGOUT /**Sesion Cerrada */:
      return false;
    default:
      return state;
  }
}

export const tags = (state = defaultState.tags, action) =>
  action.type === TAGS_LOADED ? action.payload : state;

export function posts(state = defaultState.posts, action) {
  if (action.type === POSTS_LOADED) {
    return action.payload;
  }
  if (action.type === POST_CREATED) {
    return action.payload.concat(state.data);
  }
  if (action.type === POST_INFO) {
  }
  return state;
}

export function ui(state = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };
    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: null };
    case UI_RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
