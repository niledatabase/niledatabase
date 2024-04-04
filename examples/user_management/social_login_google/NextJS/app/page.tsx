import styles from "./page.module.css";

import ErrorBox from "@/app/components/ErrorBox";
import GoogleAuthPanel from "@/app/components/GoogleAuthPanel";

export default function Home() {
  return (
    <div>
      <ErrorBox />
      <GoogleAuthPanel />
    </div>
  );
}
