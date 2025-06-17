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
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './reset-password.css'

const schema = z.object({
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    ),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'As senhas não coincidem',
  path: ['passwordConfirmation'],
});



type FormData = z.infer<typeof schema>

export default function NewPasswordResetPage() {

  const searchParams = useSearchParams();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const verifyToken = async () => {
    await axios.get('http://localhost:3002/email/verify-token');
  };

  useEffect(() => {
    verifyToken();
  }, [])

  const resetPassword = async (data: FormData) => {
    setLoading(true)
    try {
      const token = searchParams.get('token_pass');

      await axios.post('http://localhost:3002/auth/update-password', {
        password: data.passwordConfirmation,
        token: token
      });

      toast.success('Senha redefinida com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      })

      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      toast.error('Erro ao alterar senha', {
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
      <Input placeholder="senha" {...register('password')} variant="subtle" type='password' />
      <Input placeholder="confirmação de senha" {...register('passwordConfirmation')} variant="subtle" type='password' />

      <Button
        onClick={handleSubmit(resetPassword, (formErrors) => {
          const messages = Object.values(formErrors).map((err) => err?.message);
          messages.forEach((msg) => {
            toast.error(msg, {
              position: 'top-right',
              autoClose: 3000,
              theme: 'dark',
            });
          });
        })}
      >
        Alterar Senha
      </Button>


      <Link href="/" ></Link>
      <ToastContainer />

    </div>
  )
}
