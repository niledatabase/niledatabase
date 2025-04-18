import { Discord, Google, SignInForm, SignUpForm } from "@niledatabase/react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mt-44">
      <Google
        className="bg-[#4285f4] hover:bg-[#4285f4] pl-[3px] text-white gap-4"
        callbackUrl="/directions"
      />
    </div>
  );
}
