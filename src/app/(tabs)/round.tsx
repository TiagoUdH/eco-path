import { Image, Text, TouchableOpacity, View } from "react-native";

import LogoImg from "@/assets/logo.png";
import MapImg from "@/assets/map.png";
import { useState } from "react";

export default function Round() {
    const [isCollected, setIsCollected] = useState(false)

    function handleIsCollected() {
        setIsCollected(true)
    }

    return (
        <View className="flex-1">
            <Image
                source={LogoImg}
                className="absolute top-10 right-4 z-10"
            />

            <Image
                source={MapImg}
                className="w-screen h-screen"
            />

            <View className="bg-white absolute bottom-3 pt-3 pb-5 w-full max-w-[335px] ml-8 items-center gap-4 rounded-full">
                <View className="gap-3 items-center">
                    <Text className="text-xl font-body">Registrar coleta</Text>
                    <Text className="text-sm font-body">Confirme a coleta clicando abaixo</Text>
                </View>

                {!isCollected ? (
                    <TouchableOpacity activeOpacity={0.7} onPress={handleIsCollected}>
                        <Text className="text-xl font-heading text-blue">Confirmar coleta</Text>
                    </TouchableOpacity>
                ) : (
                    <Text className="text-xl font-heading text-blue">Coletado</Text>
                )}
            </View>
        </View>
    )
}