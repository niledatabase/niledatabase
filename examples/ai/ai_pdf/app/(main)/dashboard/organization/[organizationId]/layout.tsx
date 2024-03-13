import { Navbar } from "../../_components/navbar";
import { Sidebar } from "../../_components/sidebar";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-x-7">
          {/* <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div> */}
          <div className="max-w-sm flex flex-row space-x-4">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OrganizationIdLayout;
