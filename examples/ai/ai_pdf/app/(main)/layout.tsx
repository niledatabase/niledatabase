import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import 'simplebar-react/dist/simplebar.min.css'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <main>
        <Toaster richColors toastOptions={{duration: 10000}}/>
        <ModalProvider />
        {children}
      </main>
    </QueryProvider>
  );
};

export default MainLayout;
