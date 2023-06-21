import { posts, defaultState } from "../reducers";
adverts;
import { POSTS_LOADED, POST_CREATED, POST_DELETED } from "../types";

/**Tests de Publicaciones */

describe("posts", () => {
  test('Deberia manejar las publicaciones cargadas POST_LOADED" action', () => {
    const payload = [{ id: "3" }];
    const action = { type: POSTS_LOADED, payload };
    const prevState = defaultState.adverts;
    const expectedState = { loaded: true, data: payload };
    expect(posts(prevState, action)).toEqual(expectedState);
  });

  test('Deberia manejar las publicaciones creadas "POST_CREATED" action', () => {
    const payload = { id: "3" };
    const action = { type: POST_CREATED, payload };
    const prevState = defaultState.adverts;
    const expectedState = { data: [payload] };
    expect(posts(prevState, action)).toMatchObject(expectedState);
  });

  test('Deberia manejar las publicaciones borradas "POST_DELETED" action', () => {
    const payload = "3";
    const action = { type: POST_DELETED, payload };
    const prevState = { data: [{ id: payload }] };
    const expectedState = { data: [] };
    expect(posts(prevState, action)).toMatchObject(expectedState);
  });

  test("Deberia manejar CUALQUIER publicacion", () => {
    const action = { type: "ANY" };
    const prevState = defaultState.adverts;
    const expectedState = prevState;
    expect(posts(prevState, action)).toBe(expectedState);
  });
});
