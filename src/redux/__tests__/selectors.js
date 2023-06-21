import {
  getAreTagsLoaded,
  getTags,
  getPost,
} from "../../components/store/selectors";

const tags = ["motor", "mobile"];
const posts = [{ id: "1" }];
const state = { tags, posts: { data: posts } };

describe("getAreTagsLoaded", () => {
  test("should return false", () => {
    const stateWithoutTags = { ...state, tags: [] };
    expect(getAreTagsLoaded(stateWithoutTags)).toBe(false);
  });

  test("Deberia devolver Verdadero", () => {
    expect(getAreTagsLoaded(state)).toBe(true);
  });
});

describe("getTags", () => {
  test("Deberia devolver todos los Tags", () => {
    expect(getTags(state)).toBe(tags);
  });
});

describe("getPost", () => {
  test("Deberia devolver Post", () => {
    expect(getPost("1")(state)).toBe(posts[0]);
  });

  test("Deberia devolver Indefinido", () => {
    expect(getPost("2")(state)).toBeUndefined();
  });
});
