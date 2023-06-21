import client, { removeAuthoHeader, setAuthoHeader } from "../../api/client";
import storage from "../../utils/storange";

/**Recoje el AcessToken para recordar usuario  */
export const login = (credentials, rememberMe) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthoHeader(accessToken);
    if (rememberMe) {
      storage.set("auth", accessToken);
    }
  });
};

/**Se borra el Token para cerrar sesion */
export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthoHeader();
    storage.remove("auth");
  });
};
