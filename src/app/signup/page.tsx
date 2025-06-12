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
import axios from 'axios'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(1, 'Nome é obrigatório'),
})

type FormData = z.infer<typeof schema>

export default function SignUpPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await axios.post('http://localhost:3002/users/create', data)

      toast.success('Redirecionando para dashboard...', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      })

      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      toast.error('Erro ao criar usuário', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-signup flex column justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Authenticator App</Code>
      <Input placeholder="Nome" {...register('name')} variant="subtle"  />
      <Input placeholder="Email" {...register('email')} variant="subtle"  />
      <Input placeholder="Senha" {...register('password')} type="password" variant="subtle"  />

      <Button  onClick={handleSubmit(onSubmit)}>
        Criar usuário
      </Button>
      <span>Já possui um usuário? <Link href="/" ><span style={{ color: '#2D82B7' }}>clique aqui.</span></Link></span>
      <ToastContainer />

    </div>
  )
}
