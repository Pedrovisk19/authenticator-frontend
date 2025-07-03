'use client'
import { Provider } from "@/components/ui/provider";
import { ToastContainer } from "react-toastify";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { useEffect, useState } from "react";


export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
      <Provider>{children}</Provider>
  );
}
