import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";

import AvatarImg from "@/assets/avatar-example.png";
import LogoImg from "@/assets/logo.png";
import { UserContext } from "@/contexts/UserContext";
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { format, toZonedTime } from 'date-fns-tz';

type Collect = {
    id: number,
    requester: number,
    solicitation_time: string,
    collection_time: string | null,
    status: 'in_progress' | 'completed',
}

export default function Profile() {
    const router = useRouter()

    const { user } = useContext(UserContext)

    const [data, setData] = useState<Collect[]>([])

    function handleGoBack() {
        router.navigate("/home")
    } // Importando as funções do date-fns-tz

    function formatDate(date: Date | null): string {
        if (!date) return "Data inválida";

        const saoPauloTime = toZonedTime(date, 'America/Sao_Paulo');

        return format(saoPauloTime, 'dd/MM/yyyy - HH:mm');
    }

    async function fetchCollectRequests(){
        const response = await api.get(`user/${user.id}/collections/`)

        setData(response.data)
    }

    useEffect(() => {
        fetchCollectRequests()
    }, [])

    return (
        <SafeAreaView className="flex-1 pt-10 items-center gap-6">
            <TouchableOpacity className="absolute top-10 left-4" onPress={handleGoBack}>
                <Feather name="arrow-left" size={16} />
            </TouchableOpacity>

            <Image
                source={LogoImg}
                className="absolute top-10 right-4"
            />

            <Image
                source={AvatarImg}
                className="rounded-full"
            />

            <View className="px-4 w-full gap-3">
                <Text className="text-xl font-body">Nome: {user.first_name} {user.last_name}</Text>
                <Text className="text-xl font-body">Idade: {user.age}</Text>
                <Text className="text-xl font-body">Número: {user.phone}</Text>
                <Text className="text-xl font-body">Endereço: Rua {user.address}</Text>
                <Text className="text-xl font-body">Bairro: {user.neighborhood}</Text>
            </View>

            <View className="bg-blue flex-1 w-full p-8">
                <Text className="text-base font-heading text-white mb-3">Últimas Solicitações</Text>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View className="bg-indigo-400 py-4 px-6 mb-6 gap-2">
                            <Text className="text-white font-body">Dia {formatDate(new Date(item.solicitation_time))}</Text>

                            <View>
                                <Text className="text-white font-body">Solicitado com sucesso!</Text>
                                <Text className="text-white font-body">
                                    {item.collection_time != null ? (
                                        `Coletado às ${formatDate(new Date(item.collection_time))}`
                                    ) : (
                                        "Ainda não coletado"
                                    )}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => String(item.id)}
                />
            </View>
        </SafeAreaView>
    )
}