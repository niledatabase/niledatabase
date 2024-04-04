import styles from "../page.module.css";
import SignUp from "@/components/SignUpForm";

// very simple sign up page, it uses a wrapper component around Nile's React components
export default function SignUpPage() {
  return (
    <main className={styles.main}>
      <SignUp />
    </main>
  );
}
