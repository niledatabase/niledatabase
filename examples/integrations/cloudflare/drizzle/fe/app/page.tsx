import GoogleAuthPanel from "@/components/GoogleSSOForm";

export default function Home() {
  const authType = process.env.AUTH_TYPE;
  return (
    <div>
      <GoogleAuthPanel />
    </div>
  );
}
