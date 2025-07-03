/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import Navbar from "@/app/components/NavBar";

export default function DashboardPage() {
  type UserPermissionsType = { allowEdit: boolean, allowView: boolean } | null;

  return (
    <div className="logout flex column justify-center items-center h-screen">
      <Navbar />
      bem vindo do authenticator
    </div>
  )
}
