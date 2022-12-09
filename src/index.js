import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Store from "./store/store";
import App from "./App";
import "./index.scss";

const store = new Store();

export const Context = createContext(
  store,
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
