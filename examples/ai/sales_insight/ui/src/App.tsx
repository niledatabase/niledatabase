import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth";
import SignUp from "./pages/SignUpForm";
import Tenants from "./pages/tenants";
import Chat from "./pages/chat";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tenants/:tenantId/chat",
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tenants",
    element: <Tenants />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
