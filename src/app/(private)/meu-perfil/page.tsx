/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { z } from 'zod'
import { UserModel } from "../../components/ConfirmDelete"
import { useRouter } from 'next/navigation'
import { Code } from '@chakra-ui/react'
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
});

type FormData = z.infer<typeof schema>
type Item = UserModel;

export default function MyProfilePage() {
  const router = useRouter();



  return (
    <div className="logout flex column justify-center items-center h-screen">
      <Code className='cursor-pointer mb-2 p-1.5' onClick={() => router.back()}>← voltar</Code>

      Meu Perfil


    </div>
  )
}
