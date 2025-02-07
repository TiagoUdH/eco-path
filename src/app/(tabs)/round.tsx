import LogoImg from "@/assets/logo.png";
import { api } from "@/services/api";
import { useFocusEffect } from "expo-router";
import { Fragment, useCallback, useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import MapPng from "@/assets/map.png";
import ModernaPng from "@/assets/moderna.png";
import PalmiraPng from "@/assets/palmira.png";
import PrefeituraPng from "@/assets/prefeitura.png";
import TemporadaPng from "@/assets/temporada.png";
import { UserContext } from "@/contexts/UserContext";

type UnattendedRequest = {
    id: number;
    solicitation_time: string;
    address: string;
    neighborhood: string;
};

const points = [PalmiraPng, PrefeituraPng, ModernaPng, TemporadaPng, MapPng];

export default function Round() {
    const [isLoading, setIsLoading] = useState(true);
    const [unattendedRequests, setUnattendedRequests] = useState<UnattendedRequest[]>([]);

    const { user } = useContext(UserContext)

    const fetchUnattendedRequests = async () => {
        try {
            const response = await api.get("/unattended-requests/");
            const data: UnattendedRequest[] = response.data;
            setUnattendedRequests(data);
        } catch (error) {
            console.error("Erro ao buscar solicitações", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUnattendedRequests();
        }, [])
    );

    async function handleIsCollected() {
        // Atualizar o status da coleta
        await api.patch(`collection-request/${unattendedRequests[0].id}/mark-completed/`, {
            status: "completed",
            driver: user.id,
        });

        // Remover o primeiro item dos arrays
        setUnattendedRequests((prevRequests) => prevRequests.slice(1)); // Remove o primeiro item de unattendedRequests
    }

    return (
        <View className="flex-1">
            <Image source={LogoImg} className="absolute top-10 right-4 z-10" />

            {isLoading ? (
                <Text>Carregando...</Text> // Exibe mensagem de carregamento
            ) :  (
                <Fragment>
                    <Image source={points[4 - unattendedRequests.length]} className="w-screen h-screen" />
                            <View className="bg-white absolute bottom-3 pt-3 pb-5 w-full max-w-[335px] ml-8 items-center gap-4 rounded-full">

                            {unattendedRequests.length > 0 ? (
                                <Fragment>
                                    <View className="gap-3 items-center">
                                        <Text className="text-xl font-body">Registrar coleta</Text>
                                        <Text className="text-sm font-body">{unattendedRequests[0].address}</Text>
                                        <Text className="text-sm font-body">Bairro: {unattendedRequests[0].neighborhood}</Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.7} onPress={handleIsCollected}>
                                        <Text className="text-xl font-heading text-blue">Confirmar coleta</Text>
                                    </TouchableOpacity>
                                </Fragment>
                            ) : (
                                    <Text className="text-xl font-heading text-blue">Todos as coletas foram realizadas</Text>
                            )}
                    </View>
                </Fragment>
            )}
        </View>
    );
}
