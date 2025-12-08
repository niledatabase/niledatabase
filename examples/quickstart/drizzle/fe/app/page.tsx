import { Discord, Google, SignInForm, SignUpForm } from '@niledatabase/react';

export default function Home() {
  return (
    <div className="mt-44 flex flex-col gap-4">
      <Google
        className="gap-4 bg-[#4285f4] pl-[3px] text-white hover:bg-[#4285f4]"
        callbackUrl="/directions"
      />
      {/*<Discord className="bg-[#5865F2] !pl-3" callbackUrl="/directions" />*/}
      {/* <SignUpForm /> */}
      {/* <SignInForm /> */}
    </div>
  );
}
