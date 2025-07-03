/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Code } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { UserModel } from "../../components/ConfirmDelete"

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
});

type FormData = z.infer<typeof schema>
type Item = UserModel;

export default function CreateUsersPage() {

  const router = useRouter();


  return (
    <div className="logout flex column justify-center items-center h-screen">
      <Code className='cursor-pointer mb-2 p-1.5' onClick={() => router.back()}>← voltar</Code>

      criando usuário


    </div>
  )
}
