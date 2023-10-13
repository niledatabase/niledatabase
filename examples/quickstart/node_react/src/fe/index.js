import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Todos from "./todos";
import Auth from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tenants/:tenantId/todos",
    element: <Todos />,
  },
  {
    path: "/tenants",
    element: <App />,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
