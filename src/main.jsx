import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/index.js";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        basename="/tic-tac-toe/"
      >
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
