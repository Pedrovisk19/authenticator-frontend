/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/auth/signin/page.tsx
'use client'

import { Button, Switch, Avatar, Card } from "@chakra-ui/react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiCheck, HiX } from "react-icons/hi"
import { ToastContainer, toast } from 'react-toastify'

export default function UserPermissionsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [user, setUser] = useState<{ name?: string }>({});
  const [permissaoVisualizar, setPermissaoVisualizar] = useState(false);
  const [permissaoEditar, setPermissaoEditar] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3002/users/${id}`).then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  const savePermissions = async () => {
    try {
      await axios.post('http://localhost:3002/user-permissions/save-permission', {
        userId: id,
        visualizar: permissaoVisualizar,
        editar: permissaoEditar,
      });

      toast.success('Permissões salvas com sucesso', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      });

    } catch (error) {
      console.error('Erro ao salvar permissões:', error);
      toast.error('Erro ao salvar permissões', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>Olá {user.name ?? ''}</p>

      <Card.Root width="320px">
        <Card.Body gap="2">
          <Card.Title mt="2">Configurações</Card.Title>
          <Switch.Root size="lg">
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb>
                <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                  <HiCheck />
                </Switch.ThumbIndicator>
              </Switch.Thumb>
            </Switch.Control>
            <Switch.Label>Permitir Visualização</Switch.Label>
          </Switch.Root>
          <Switch.Root size="lg" >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb>
                <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                  <HiCheck />
                </Switch.ThumbIndicator>
              </Switch.Thumb>
            </Switch.Control>
            <Switch.Label>Permitir Edição</Switch.Label>
          </Switch.Root>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Voltar</Button>

          <Button bgColor="green" color={"white"} ml={3} >
            Salvar Configurações
          </Button>
        </Card.Footer>
      </Card.Root>

      <ToastContainer />

    </div>
  )
}
