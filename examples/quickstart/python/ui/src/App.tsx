import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/auth';
import SignUp from "./pages/SignUpForm";
import Tenants from "./pages/tenants";
import Todos from "./pages/todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
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

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;



