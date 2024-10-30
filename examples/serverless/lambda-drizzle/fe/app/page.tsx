import { Suspense } from 'react';
import GoogleAuthPanel from "../components/GoogleSSOForm";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAuthPanel />
    </Suspense>
  );
}
