import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./utils/storange";
import { setAuthoHeader } from "./api/client";
import configureStore from "./redux";

import Root from "./utils/Root";

/**Se hace una confirmacion si hay una Sesion Iniciada */
const accessToken = storage.get("auth");
if (accessToken) {
  setAuthoHeader(accessToken);
}

const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <App isInitLogged={!!accessToken} />
    </Root>
  </React.StrictMode>
);
