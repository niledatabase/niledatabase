import Subscribe from './Subscribe';

export default function Footer() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-[48px] z-10 relative mb-9">
        Get the latest posts to your inbox
      </div>
      <Subscribe />
      <div className="opacity-60 text-[16px] w-[450px] text-center">
        We respect your time and your inbox, we will not spam you with unrelated
        stuff.
      </div>
    </div>
  );
}
