import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001",
});

/**Respuestas y Mensaje de Error */
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    return Promise.reject({ message: error.message });
  }
);

/*Esto se ve muy complicado pero es donde se agarra el Token del Log In*/
export const setAuthoHeader = (token) =>
  (client.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export const removeAuthoHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};

export default client;
