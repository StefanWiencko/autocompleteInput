import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store.js";
import { fetchUsers } from "./usersSlice";
import "./index.css";
store.dispatch(fetchUsers());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
