import { EdgeStoreProvider } from "@/lib/edgestore";
import ModalProvider from "@/providers/ModalProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
