import { Navbar } from '../(marketing)/_components/navbar';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pb-20 pt-40">{children}</main>
    </div>
  );
};

export default AuthLayout;
