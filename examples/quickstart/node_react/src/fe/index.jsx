import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout.jsx";
import Routes from "./routes.jsx";
import "./css/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Layout>
);
