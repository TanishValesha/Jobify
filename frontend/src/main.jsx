import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { Provider } from "react-redux";
import { setUser } from "./features/users/userSlice.js";
import { store } from "../app/store.js";

const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
  store.dispatch(setUser(storedUser));
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
);
