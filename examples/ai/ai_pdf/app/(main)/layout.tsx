import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import 'simplebar-react/dist/simplebar.min.css'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // configureNile(cookies().get("authData"), nile.userId);
  // console.log("showing tenants page for user: " + nile.userId);
  // if (!nile.userId) {
  //   redirect("/login");
  // }
  return (
    <QueryProvider>
      <main>
        <Toaster />
        <ModalProvider />
        {children}
      </main>
    </QueryProvider>
  );
};

export default MainLayout;
