/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Button, Code } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'
import './dash.css'
import { useState } from 'react'
// import './signup.css'

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
    toast('Até logo ...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: 'flip'
    });    
    router.push('/') 
  }

  const data = {
    email: 'pedro@email.com',
    password: '12345'
  }

  return (
    <div className="logout flex column justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Dashboard ()</Code>
      <Button loading={loading} onClick={() => onSubmit(data)}>
              logout
            </Button>
      <ToastContainer />

    </div>
  )
}
