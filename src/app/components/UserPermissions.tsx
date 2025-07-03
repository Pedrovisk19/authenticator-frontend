import { Button, Dialog, Portal, Switch } from "@chakra-ui/react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { HiX, HiCheck } from "react-icons/hi"
import { useEffect, useState } from "react"
import api from "@/axios-config"

interface UserPermissionsProps {
    userId: number
    onClose: () => void
    isOpenModal: boolean
}

export default function UserPermissions({ userId, onClose, isOpenModal }: UserPermissionsProps) {

    const [permVisualizar, setPermVisualizar] = useState(false);
    const [permEditar, setPermEditar] = useState(false);
    const [permTotal, setPermTotal] = useState(false);
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');

    useEffect(() => {
        if (permVisualizar && permEditar) {
            setPermTotal(true);
            setPermVisualizar(false);
            setPermEditar(false);
        }
    }, [permVisualizar, permEditar]);

    useEffect(() => {
        if (!permTotal) {
            // Se permissão total for desmarcada manualmente, reabilita visualização e edição
            setPermVisualizar(false);
            setPermEditar(false);
        }
    }, [permTotal]);

    

    const savePermissions = async () => {
        if (!userId) {
            toast.error('Usuário não encontrado', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            });
            return;
        }

        try {
            await api.post('user-permissions/save-permission', {
                userId: userId,
                visualizar: permTotal || permVisualizar,
                editar: permTotal || permEditar,
                total: permTotal
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
        <Dialog.Root open={isOpenModal} onOpenChange={(open) => !open && onClose()} placement="center">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Permissão de Usuário</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className='flex flex-col gap-4'>

                            <Switch.Root
                                size="lg"
                                checked={permVisualizar}
                                disabled={permTotal}
                                onCheckedChange={(details) => setPermVisualizar(details.checked)}
                            >
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

                            <Switch.Root
                                size="lg"
                                checked={permEditar}
                                disabled={permTotal}
                                onCheckedChange={(details) => setPermEditar(details.checked)}
                            >
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

                            <Switch.Root
                                size="lg"
                                checked={permTotal}
                                onCheckedChange={(details) => setPermTotal(details.checked)}
                                
                            >
                                <Switch.HiddenInput />
                                <Switch.Control>
                                    <Switch.Thumb>
                                        <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                                            <HiCheck />
                                        </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                </Switch.Control>
                                <Switch.Label>Permissão Total</Switch.Label>
                            </Switch.Root>

                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="outline" onClick={onClose}>Fechar</Button>

                            <Button bgColor="green" color="white" ml={3} onClick={savePermissions}>
                                Salvar Configurações
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <ToastContainer />
        </Dialog.Root>
    )
}
