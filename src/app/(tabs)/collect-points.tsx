import { Feather } from "@expo/vector-icons";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import LogoImg from "@/assets/logo.png";
import { api } from "@/services/api";
import { format, toZonedTime } from "date-fns-tz";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

type UnattendedRequest = {
    id: number;
    solicitation_time: string;
    address: string;
    neighborhood: string;
};


export default function CollectPoints(){
    const router = useRouter()
    const [unattendedRequests, setUnattendedRequests] = useState<UnattendedRequest[]>([]);

    function handleGoBack() {
        router.navigate("/home")
    }

    const fetchUnattendedRequests = async () => {
        const response = await api.get('/unattended-requests/');
        const data: UnattendedRequest[] = response.data;

        setUnattendedRequests(data);
    };

    function formatDate(date: Date | null): string {
            if (!date) return "Data inválida";
    
            const saoPauloTime = toZonedTime(date, 'America/Sao_Paulo');
    
            return format(saoPauloTime, 'dd/MM/yyyy');
        }

    useFocusEffect(useCallback(() =>{
        fetchUnattendedRequests()
    }, []))

    return (
        <SafeAreaView className="flex-1 p-10 items-center gap-6">
            <TouchableOpacity className="absolute top-10 left-4" onPress={handleGoBack}>
                <Feather name="arrow-left" size={16} />
            </TouchableOpacity>

            <Image
                source={LogoImg}
                className="absolute top-10 right-4"
            />

            <Text className="font-heading text-2xl mt-10">Próximos pontos de coleta</Text>

            <FlatList
                data={unattendedRequests}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <View className="bg-slate-300 p-3 w-full gap-2 rounded-sm mb-6">
                        <Text className="text-blue font-heading text-lg" style={{ textAlign: 'right' }}>Solicitado dia {formatDate(new Date(item.solicitation_time))}</Text>
                        <Text className="font-heading text-lg">{item.address}</Text>
                        <Text className="font-body text-lg">{item.neighborhood}</Text>
                    </View>
                )}
                className="w-full"
            />
        </SafeAreaView>
    )
}