import React from "react";
import ReactDOM from "react-dom/client";
import Tenants from "./tenants.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Todos from "./todos.jsx";
import Auth from "./auth.jsx";
import Layout from "./layout.jsx";
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
