'use client'
import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import ProfileAdmin from "@/components/profileAdmin/profileAdmin"
import ProfileUser from "@/components/profileUser/profileUser"
import { BASE_URL } from "@/utils/request"
import { User } from "@/app/register/type"
import { AuthContext, AuthProvider } from "@/Context/AuthContext"

interface UserProps {
    params: {
        id: string
    }
}

export default function Profile({ params }: UserProps) {
    const initialUser: User = {
        name: "",
        email: "",
        companyName: "",
        password: "",
        birth: "",
        tel: "",
        role: ""
    }

    const router = useRouter()

    const [userData, setUserData] = useState<User>(initialUser);
    const [loading, setLoading] = useState(true);

    const { isLogged } = useContext(AuthContext)

    useEffect(() => {
        if(!isLogged) return router.push('/login')
        fetchUserData()
    }, [])

    async function fetchUserData() {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/${params.id}`)
            setUserData(response.data)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="flex flex-grow justify-center items-center">
                <p className="text-xl font-semibold">
                    Loading
                    <span className="animate-pulse">...</span>
                </p>
            </main>
        );
    }

    return (
        <AuthProvider>
            <main className="flex flex-col flex-grow justify-center">
                {userData.role === "user" && <ProfileUser user={userData} />}
                {userData.role === "admin" && <ProfileAdmin user={userData} />}
            </main>
        </AuthProvider>
    )
}