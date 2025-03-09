import Tenants from "./tenants.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Todos from "./todos.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/tenants",
    element: <Tenants />,
  },
  {
    path: "tenants/:tenantId/todos",
    element: <Todos />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
