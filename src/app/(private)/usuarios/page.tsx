/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Code, Table } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuTrash2, LuUserCog } from 'react-icons/lu'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'
import { DeleteUserModal, UserModel } from "../../components/ConfirmDelete"
import EditUserModal from '../../components/EditUserModal'
import UserPermissions from '../../components/UserPermissions'
import './dash.css'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
});

type FormData = z.infer<typeof schema>
type Item = UserModel;

export default function UsersPage() {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [items, setItems] = useState<Item[]>([]);

  type UserPermissionsType = { allowEdit: boolean, allowView: boolean } | null;
  const [isUserPermissions, setIsUserPermissions] = useState<UserPermissionsType>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [isPermissionUser, setIsPermissionUser] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [user, setUser] = useState(Number)

  const atualizaTableUsers = () => {
    axios({
      method: "get",
      url: "http://localhost:3005/users",
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
  };

  useEffect(() => {
    atualizaTableUsers()
  }, []);

  const openDeleteModal = (item: Item) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  const closeEditPermissionsModal = () => {
    setIsPermissionUser(false);
  }
  const closeCreateModal = () => {
    setIsCreatingUser(false)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
  }

  const handleUserDeleted = () => {
    if (selectedItem) {
      setItems((prev) => prev.filter((i) => i.id !== selectedItem.id))
    }
  }
  const showPermissions = (userId: number) => {
    setUser(userId);
    setIsPermissionUser(true);
  }


  const editProfile = async (userId: number) => {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');

    if (!permissions?.allowEdit) {
      toast.dismiss();
      toast.error('Você não tem permissão para acessar esta tela', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    setUser(userId);
    setIsEditingUser(true);

  }


  return (
    <div className="logout flex column justify-center items-center h-screen">
        <Code className='cursor-pointer mb-2 p-1.5' onClick={() => router.back()}>← voltar</Code>
      <div className='w-1/2'>
        
        <Table.Root size="lg" variant="outline" rounded="md">
          <Table.Header>
            <Table.Row >
              <Table.ColumnHeader >Nome</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Editar</Table.ColumnHeader>
              <Table.ColumnHeader>Excluir</Table.ColumnHeader>
              <Table.ColumnHeader>Permissões</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell className='cursor-pointer text-center' onClick={() => editProfile(item.id)}>
                  <LuUserCog color="#7678ed" />
                </Table.Cell>
                <Table.Cell className='cursor-pointer' onClick={() => openDeleteModal(item)}>
                  <LuTrash2 color="#ff4d6d" />
                </Table.Cell>
                <Table.Cell className='cursor-pointer' onClick={() => showPermissions(item.id)}>
                  <UserCog />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      {isPermissionUser && (
        <UserPermissions
          isOpenModal={isPermissionUser}
          userId={user}
          onClose={closeEditPermissionsModal}
        />
      )}
      
      {selectedItem && (
        <DeleteUserModal
          user={selectedItem}
          isOpen={isOpen}
          onClose={closeDeleteModal}
          onDeleted={handleUserDeleted}
        />
      )}


      {isEditingUser && (
        <EditUserModal
          isOpenModal={isEditingUser}
          userId={user}
          onClose={() => setIsEditingUser(false)}
          atualizaTableUsers={atualizaTableUsers}
        />
      )}
      <ToastContainer />


    </div>
  )
}
