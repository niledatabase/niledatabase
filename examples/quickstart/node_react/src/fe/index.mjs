import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout.jsx";
import Routes from "./routes.mjs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Layout>
);
