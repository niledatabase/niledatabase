import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/auth';
import SignUp from './pages/SignUpForm';
import Tenants from './pages/tenants';
import Todos from './pages/todos';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'tenants/:tenantId/todos',
    element: <Todos />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/tenants',
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
