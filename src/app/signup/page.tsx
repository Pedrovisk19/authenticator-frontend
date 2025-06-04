/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Button, Code, Input, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link'
import './signup.css'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
})

type FormData = z.infer<typeof schema>

export default function SignUpPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    // Simule login
    console.log('Login data:', data)
    toast('Redirecionando para dashboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: 'flip'
    });    // router.push('/') 
  }

  const data = {
    email: 'pedro@email.com',
    password: '12345'
  }

  return (
    <div className="form-signup flex column justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Authenticator App</Code>
      <Input placeholder="Insira um email" variant="subtle" />
      <Input placeholder="Insira uma senha" variant="subtle" />
      <Button loading={loading} onClick={() => onSubmit(data)}>
        Criar usuário
      </Button>
      <span>Já possui um usuário? <Link href="/" ><span style={{ color: '#2D82B7' }}>clique aqui.</span></Link></span>
      <ToastContainer />

    </div>
  )
}
