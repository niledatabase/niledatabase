import React from "react";
import ReactDOM from "react-dom/client";
import Tenants from "./tenants";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Todos from "./todos";
import Auth from "./auth";
import Layout from "./layout";
import SignUp from "./SignUpForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "tenants/:tenantId/todos",
    element: <Todos />,
  },
  {
    path: "/tenants",
    element: <Tenants />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Layout>
);
