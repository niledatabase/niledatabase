// import styles from "./page.module.css";
// import GoogleAuthPanel from "@/components/GoogleSSOForm";
import BasicLoginForm from "@/components/BasicSignInForm";
import GoogleAuthPanel from "@/components/GoogleSSOForm";

export default function Home() {
  // This demo supports both Google and email/password auth.
  // If this is the first time trying Nile, email/password will be simpler.
  // set AUTH_TYPE="google" to use Google auth
  const authType = process.env.AUTH_TYPE;
  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="items-center justify-center flex flex-col gap-3 w-full">
          {authType === "google" ? <GoogleAuthPanel /> : <BasicLoginForm />}
        </div>
      </div>
    </div>
  );
}
