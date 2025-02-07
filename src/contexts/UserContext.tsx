
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useState } from "react";

type User = {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    driver: boolean,
    address: string,
    neighborhood: string,
    age: number,
    phone: string,
}

type AuthContextType = {
    login: (username: string, password: string) => void,
    user: User,
    logout: () => void,
}

type AuthContextProps = {
    children: ReactNode
}

export const UserContext = createContext<AuthContextType>({} as AuthContextType)

export function UserProvider({ children }: AuthContextProps) {
    const router = useRouter()

    const [user, setUser] = useState({} as User)

    async function login(username: string, password: string) {
        try {
            const response = await api.post('token/', {
                username,
                password
            });

            const user_id = response.data.user_id;

            const response_user = await api.get(`user/${user_id}/`);

            setUser(response_user.data)

            router.push("/home");
        }
        catch (error) {
            console.error("Falha no login:", error);
        }
    }

    function logout(){
        setUser({} as User)
        router.navigate('/')
    }

    return (
        <UserContext.Provider value={{ login, user, logout }}>
            {children}
        </UserContext.Provider>
    )
}