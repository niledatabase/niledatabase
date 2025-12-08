import { useSearchParams } from 'react-router-dom';
import BasicLoginForm from '../components/BasicLoginForm';
import Layout from '../layout';
import Cookies from 'js-cookie';

export default function Auth() {
  // handle logouts here
  const [searchParams] = useSearchParams();
  if (searchParams.has('logout')) {
    Cookies.remove('authData');
  }

  return (
    <Layout>
      <BasicLoginForm />
    </Layout>
  );
}
