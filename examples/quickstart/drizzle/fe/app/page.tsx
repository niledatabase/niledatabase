import {
  Discord,
  Google,
  GitHub,
  SignInForm,
  SignUpForm,
} from "@niledatabase/react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mt-44">
      <Google
        className="bg-[#4285f4] hover:bg-[#4285f4] pl-[3px] text-white gap-4"
        callbackUrl="/dashboard"
      />
      <Discord className="bg-[#5865F2] !pl-3" callbackUrl="/dashboard" />
      <GitHub className="bg-[#5865F2] !pl-3" callbackUrl="/dashboard" />
      <SignUpForm />
      {/* <SignInForm /> */}
    </div>
  );
}
