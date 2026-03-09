import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { BiodataProvider } from "./context/BiodataContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <BiodataProvider>
      <App />
    </BiodataProvider>
  </AuthProvider>
  </BrowserRouter>
);