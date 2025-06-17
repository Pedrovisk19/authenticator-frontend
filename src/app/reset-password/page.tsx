/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Button, Code, Input } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import './reset-password.css'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const resetPassword = async (data: FormData) => {
    setLoading(true)
    try {
      await axios.post('http://localhost:3002/email/send-reset', {
        to: data.email,
        resetLink: `http://localhost:3000/new-password-reset`,
      });

      toast.success('Email de redefinição de senha foi enviado!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      })

      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      toast.error('Erro ao resetar senha', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-reset-password  flex column justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Reset Password</Code>
      <Input placeholder="Email" {...register('email')} variant="subtle" />

      <Button onClick={handleSubmit(resetPassword)}>
        Resetar Senha
      </Button>
      <Link href="/" ></Link>
      <ToastContainer />

    </div>
  )
}
