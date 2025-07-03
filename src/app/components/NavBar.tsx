import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { User, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('token')
        Cookies.remove('token')
        router.push('/')
    }

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-around h-16 bg-gray-800 text-white px-10 shadow-md z-50 ">
            <div className='flex items-center justify-between'>

                <div className="flex items-center space-x-6 gap-7">
                    <Link href="/create-users" className="p-2 hover:bg-gray-700 rounded">
                        novo usuário
                    </Link>
                    <Link href="/usuarios" className="p-2 hover:bg-gray-700 rounded">
                        usuários
                    </Link>
                    <Link href="/meu-perfil" className="p-2 hover:bg-gray-700 rounded">
                        meu perfil
                    </Link>
                    <button onClick={logout} className="p-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition cursor-pointer">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
