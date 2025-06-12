/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Button, Code, Table } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'
import './dash.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LuTrash2, LuUserCog } from 'react-icons/lu'
import { DeleteUserModal, UserModel } from "../components/ConfirmDelete"
// import './signup.css'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
});

type FormData = z.infer<typeof schema>
type Item = UserModel;

export default function SignUpPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3002/users",
    }).then((response) => {
      setItems(response.data)
    }).catch((error) => {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch items', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const openDeleteModal = (item: Item) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
  }

  const handleUserDeleted = () => {
    if (selectedItem) {
      setItems((prev) => prev.filter((i) => i.id !== selectedItem.id))
    }
  }

  return (
    <div className="logout flex column justify-center items-center h-screen">
      <Code size="lg" variant="solid" colorPalette="purple">Dashboard ()</Code>

      <div className='w-1/2'>
        <Table.Root size="lg" variant="outline" rounded="md">
          <Table.Header>
            <Table.Row >
              <Table.ColumnHeader >Nome</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Editar</Table.ColumnHeader>
              <Table.ColumnHeader>Excluir</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell className='cursor-pointer text-center'><LuUserCog color="#7678ed" /></Table.Cell>
                <Table.Cell className='cursor-pointer' onClick={() => openDeleteModal(item)}>
                  <LuTrash2 color="#ff4d6d" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <ToastContainer />
      </div>


      {selectedItem && (
        <DeleteUserModal
          user={selectedItem}
          isOpen={isOpen}
          onClose={closeDeleteModal}
          onDeleted={handleUserDeleted}
        />
      )}
      <ToastContainer />


    </div>
  )
}
