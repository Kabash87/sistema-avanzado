import {
  postCreated,
  postsLoaded,
  postsRequest,
  postsError,
  authLogin,
  authLoginRequest,
  authLoginSuccess,
  authLoginFail,
} from "../actions";

import { POST_CREATED } from "../types";

describe("postCreated", () => {
  test("deberia crear una accion POST_CREATED", () => {
    const post = "post";
    const expectedAction = { type: POST_CREATED, payload: post };
    expect(postCreated(post)).toEqual(expectedAction);
  });
});

describe("postsLoaded", () => {
  const action = postsLoaded();
  const service = {
    posts: {},
  };

  test("Deberia cargar las publicaciones", () => {
    const getState = () => ({ posts: { loaded: true } });
    const dispatch = jest.fn();
    action(dispatch, getState, { service });

    expect(dispatch).not.toHaveBeenCalled();
  });

  test("Se resuelve la llamada de getPost", async () => {
    const getState = () => ({ posts: { loaded: false } });
    const dispatch = jest.fn();
    const posts = "posts";

    service.posts.getPost = jest.fn().mockResolvedValue(posts);
    await action(dispatch, getState, { service });

    expect(dispatch).toHaveBeenNthCalledWith(1, postsRequest());

    expect(service.posts.getPosts).toHaveBeenCalled();

    expect(dispatch).toHaveBeenNthCalledWith(2, postsLoaded(posts));
  });

  test("Se rechaza la llamada de servicio de getPosts", async () => {
    const getState = () => ({ posts: { loaded: false } });
    const dispatch = jest.fn();
    const error = { statusCode: 401 };
    const history = { push: jest.fn() };
    service.posts.getPost = jest.fn().mockRejectedValue(error);

    await action(dispatch, getState, { service, history });

    expect(dispatch).toHaveBeenNthCalledWith(2, postsError(error));
  });
});
/**Inicios y Cierres de Sesiones */
describe("authLogin", () => {
  const credentials = "credentials";
  const from = "from";
  const action = authLogin(credentials);
  const dispatch = jest.fn();
  const service = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from } } },
  };

  describe("Se resuelve el Api de Inicio de Sesion", () => {
    test("Deberia seguir con el Log In", async () => {
      service.auth.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { service, router });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(service.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
      expect(router.navigate).toHaveBeenCalledWith(from, {
        replace: true,
      });
    });
  });

  describe("Se rechaza el Api de Log In", () => {
    const error = new Error("Oh No!😫");
    test("Deberia seguir con el error", async () => {
      service.auth.login = jest.fn().mockRejectedValue(error);

      const promise = action(dispatch, undefined, { service });
      await expect(promise).rejects.toThrow(error);
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFail(error));
    });
  });
});
