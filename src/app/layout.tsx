import { Provider } from "@/components/ui/provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { PermissionsProvider } from "@/contexts/PermissionsContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PermissionsProvider>
      <html lang="en" suppressHydrationWarning>
        <body
        >
          <Provider>{children}</Provider>
          <ToastContainer />
        </body>
      </html>
    </PermissionsProvider>
  );
}
