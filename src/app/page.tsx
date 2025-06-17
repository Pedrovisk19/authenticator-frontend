'use client'

import { Button, Code, Input, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Link from 'next/link'
import './login.css'
import { useState } from 'react'
import Cookies from 'js-cookie'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
})

type FormData = z.infer<typeof schema>

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email: data.email,
        password: data.password
      })

      toast.success('Bem vindo !', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      });

      localStorage.setItem('token', response.data.token)
      Cookies.set('token', response.data.token, { expires: 1 })

      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const onError = () => {
    toast.error('Insira um email e senha válida para logar!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="form-login flex flex-col gap-4 justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Authorization App</Code>

      <Input
        placeholder="Insira um email"
        variant="subtle"
        {...register('email')}
      />

      <Input
        type="password"
        placeholder="Insira uma senha"
        variant="subtle"
        {...register('password')}
      />

      <Button type="submit" >
        Entrar
      </Button>

      <span>
        Não tem usuário?{' '}
        <Link href="/signup">
          <span style={{ color: '#2D82B7' }}>clique aqui.</span>
        </Link>
      </span>
      <span>
        Esqueceu sua senha?{' '}
        <Link href="/reset-password">
          <span style={{ color: '#2D82B7' }}>clique aqui.</span>
        </Link>
      </span>

      <ToastContainer />
    </form>
  )
}
