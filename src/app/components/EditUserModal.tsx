/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Button, Dialog, Input } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { UserModel } from "./ConfirmDelete"

import {
    Portal
} from "@chakra-ui/react"
import api from '@/axios-config'

const schema = z.object({
    name: z.string().min(1, 'Nome inválido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha inválida'),
});

type FormData = z.infer<typeof schema>
interface EditUserModalProps {
    isOpenModal: boolean
    onClose: () => void
    atualizaTableUsers: () => void
    userId: number
}
export default function EditUserModal({ onClose, isOpenModal,atualizaTableUsers,userId }: EditUserModalProps) {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const createUser = async (data: FormData) => {
        try {
            await api.post('users/edit', data)

            toast.success('usuário criado com sucesso', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            })

            atualizaTableUsers()
            onClose()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data.message)
                toast.error(`${error.response.data.message}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                })
            } else {
                console.log(error)
                toast.error('Ocorreu um erro ao editar o usuário.', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                })
            }
        } 
    }
    
    return (
        <Dialog.Root open={isOpenModal} onOpenChange={(open) => !open && onClose()} placement="center">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edição de Usuário</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className='flex flex-col gap-4'>
                            <Input placeholder="Nome" {...register('name')} variant="subtle" />
                            <Input placeholder="Email" {...register('email')} variant="subtle" />
                            <Input placeholder="Senha" {...register('password')} type="password" variant="subtle" />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button bgColor="green" color={"white"} ml={3} onClick={handleSubmit(createUser)}>
                                Editar
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
