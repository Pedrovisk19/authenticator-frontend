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
import axios from 'axios'
import Link from 'next/link'
import './login.css'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
})

type FormData = z.infer<typeof schema>

export default function SignInPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    // Simule login
    console.log('Login data:', data)

    try {

      const response = await axios({
        method: "post",
        url: "http://localhost:3002/auth/login",
        data: {
          email: data.email,
          password: data.password
        }
      });

      toast("redirecting...");

      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);

      localStorage.setItem('token', response.data.token);


    } catch (error) {
      console.log('Error fetching users:', error);
    }

  }

  const data = {
    email: 'pedro@email.com',
    password: '12345'
  }

  return (
    <div className="form-login flex justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Authorization App</Code>
      <Input placeholder="Insira um email" variant="subtle" />
      <Input placeholder="Insira uma senha" variant="subtle" />
      <Button loading={loading} onClick={() => onSubmit(data)}>
        Entrar
      </Button>
      <span>Não tem usuário? <Link href="/signup" ><span style={{ color: '#2D82B7' }}>clique aqui.</span></Link></span>
      <ToastContainer />

    </div>
  )
}
