import { Navbar } from '../../_components/navbar';
import { Sidebar } from '../../_components/sidebar';

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-20 md:pt-24 2xl:max-w-screen-2xl">
        <div className="flex flex-col gap-x-7">
          <div className="flex max-w-sm flex-row space-x-4">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OrganizationIdLayout;
