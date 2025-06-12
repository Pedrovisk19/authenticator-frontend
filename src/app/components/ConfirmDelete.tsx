'use client'

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react"
import { toast } from "react-toastify"


interface DeleteUserModalProps {
    user: UserModel
    isOpen: boolean
    onClose: () => void
    onDeleted: () => void
}

export interface UserModel {
  id: number
  name: string
  email: string
}

export function DeleteUserModal({ user, isOpen, onClose, onDeleted }: DeleteUserModalProps) {

  const onConfirm = async () => {
    try {
      await fetch(`http://localhost:3002/users/delete/${user.id}`, {
        method: "DELETE"
      })

      toast.success("Colaborador excluído com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      })

      onDeleted()
      onClose()
    } catch (error) {
      console.error("Erro ao excluir:", error)
      toast.error("Erro ao excluir colaborador", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      })
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Esta ação não pode ser desfeita. Deseja excluir o colaborador <strong>{user.name}</strong>?
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button bgColor="red" color={"white"} ml={3} onClick={onConfirm}>
                Deletar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
