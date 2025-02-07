import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import LogoImg from "@/assets/logo.png";
import { Button } from "@/components/Button";

import { UserContext } from "@/contexts/UserContext";
import { api } from "@/services/api";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Fragment, useContext, useEffect, useState } from "react";

export default function Home() {
    const { user, logout } = useContext(UserContext)

    const [isSolicited, setIsSolicited] = useState(false);

    const router = useRouter()

    function handleProfile() {
        router.push("/profile")
    }

    async function handleRequest(){
        await api.post('collection-request/', {
            requester: user.id
        })

        setIsSolicited(true)
    }

    async function checkUnattendedRequest() {
        try {
            const response = await api.get(`unattended-collection-request/${user.id}/`);

            if (response.data.message === "Existem solicitações de coleta não atendidas.") {
                setIsSolicited(true);
            } else {
                setIsSolicited(false);
            }
        } catch (error) {
            console.error("Erro ao verificar a solicitação:", error);
            setIsSolicited(false);
        }
    }

    useEffect(() => {
        checkUnattendedRequest(); // Chama a função assim que o componente carregar
    }, []);

    return (
        <SafeAreaView className="py-10 px-20 items-center justify-between flex-1 w-full">
            <Image
                source={LogoImg}
                className="absolute top-10 right-4"
            />

            <View className="gap-6 items-center w-full">
                <Feather name="user" size={120} color="#0020C7" />

                <Text className="text-center font-heading text-base">Bem vindo(a) de volta Maria</Text>

                {!user.driver && ((!isSolicited) ? (
                    <Fragment>
                        <Text className="text-center font-body text-zinc-500 text-base">Deseja solicitar o serviço de coleta?</Text>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="bg-blue p-4 rounded-full w-full max-w-[238px]"
                            onPress={handleRequest}
                        >
                            <Text className="text-xl font-heading text-white text-center">Solicitar</Text>
                        </TouchableOpacity>
                    </Fragment>
                ) : (
                    <Text className="font-heading text-base text-center text-blue">Você solicitou o serviço de reciclagem com sucesso!</Text>
                ))}
            </View>

            <View className="w-full items-center gap-3">
                <Button
                    title="Ver perfil"
                    onPress={handleProfile}
                />

                <TouchableOpacity onPress={logout}>
                    <Text className="font-heading text-lg text-red-800">Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}