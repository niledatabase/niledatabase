import { Navbar } from "../(marketing)/_components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-40 pb-20">{children}</main>
    </div>
  );
};

export default AuthLayout;
