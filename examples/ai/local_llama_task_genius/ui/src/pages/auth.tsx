import Cookies from "../../node_modules/@types/js-cookie";
import { useSearchParams } from "react-router-dom";
import BasicLoginForm from "../components/BasicLoginForm";
import Layout from "../layout";

export default function Auth() {
  // handle logouts here
  const [searchParams] = useSearchParams();
  if (searchParams.has("logout")) {
    Cookies.remove("authData");
  }

  return (
    <Layout>
      <BasicLoginForm />
    </Layout>
  );
}
