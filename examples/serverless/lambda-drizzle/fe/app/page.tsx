import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import GoogleAuthPanel from "@/components/GoogleSSOForm";
import ErrorBox from "@/components/ErrorBox";

export default function Home() {
  const authType = process.env.AUTH_TYPE;
  return (
    <div>
      <div className={styles.center}>
        <Stack gap={5} sx={{ maxWidth: "40rem" }} alignItems={"center"}>
          <ErrorBox />
          {/* These components are simple wrappers around Nile's React components. 
           It is needed because Nile's React components are client-side only. */}
          <GoogleAuthPanel />
        </Stack>
      </div>
    </div>
  );
}
