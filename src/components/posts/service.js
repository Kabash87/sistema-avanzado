import client from "../../api/client";

const postsURL = "/api/v1/adverts";

export const getLastestPosts = () => {
  return client.get(postsURL);
};

/**Obtener los Posts */
export const getPost = (postId) => {
  const url = `${postsURL}/${postId}`;
  return client.get(url);
};

/**Crear nuevas Publicaciones */
export const createPost = (advert) => {
  const url = postsURL;
  return client.post(url, advert);
};

/**Eliminar publicaciones */
export const deletePost = (postId) => {
  const url = `${postsURL}/${postId}`;
  return client.delete(url);
};

export const getTags = () => {
  return client.get(`${postsURL}/tags`);
};
