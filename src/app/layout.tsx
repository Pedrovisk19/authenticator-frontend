'use client'
import { Provider } from "@/components/ui/provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import Navbar from "./components/NavBar";
import { useEffect, useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html>
      <body
      >
        <ThemeWrapper>
          <Provider>
            <div>
              {children}
            </div>
          </Provider>
          <ToastContainer />
        </ThemeWrapper>
      </body>
    </html>
  );
}

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // evita o mismatch

  return (

    <>{children} </>
  )

}
