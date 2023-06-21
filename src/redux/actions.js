import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  POST_CREATED,
  POST_DELETED,
  POST_INFO,
  POSTS_LOADED,
  POSTS_LOADED_FAIL,
  POSTS_REQUEST,
  UI_RESET_ERROR,
  TAGS_LOADED,
} from "./types";
import { getAreTagsLoaded } from "../components/store/selectors";
/**Inicios y Cierres de Sesion */
export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authLoginFail = (error) => ({
  type: AUTH_LOGIN_FAIL,
  error: true,
  payload: error,
});

export function authLogin(credentials) {
  return async function (dispatch, _getState, { service, router }) {
    dispatch(authLoginRequest());
    try {
      await service.auth.login(credentials);
      dispatch(authLoginSuccess());
      const from = router.state.location.state?.from || "/";
      router.navigate(from, { replace: true });
    } catch (error) {
      dispatch(authLoginFail(error));
      throw error;
    }
  };
}

/**Publicaciones y Cargado */
export const postsLoaded = (posts) => ({
  type: POSTS_LOADED,
  payload: posts,
});

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsError = (error) => ({
  type: POSTS_LOADED_FAIL,
  error: true,
  payload: error,
});

export const postInfo = (post) => ({
  type: POST_INFO,
  payload: post,
});

/**UI */
export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});

/**Creacion y Borrado de Publicaciones */
export const postCreated = (post) => ({
  type: POST_CREATED,
  payload: post,
});

export const postDeleted = () => ({
  type: POST_DELETED,
});

/**Tags */
export const tagsLoaded = (tags) => ({
  type: TAGS_LOADED,
  payload: tags,
});

export const loadTags = () => {
  return async function (dispatch, getState, { service }) {
    if (getAreTagsLoaded(getState())) {
      return;
    }
    const tags = await service.posts.getTags();
    dispatch(tagsLoaded(tags));
  };
};
