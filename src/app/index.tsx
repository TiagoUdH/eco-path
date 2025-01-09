import { Image, Text, TouchableOpacity, View } from "react-native"

import HeroImg from "@/assets/hero.png"
import { useRouter } from "expo-router"

export default function Index() {
    const router = useRouter()

    function handleHome() {
        router.push("/home")
    }

    return (
        <View className="bg-blue flex-1 justify-center items-center">
            <Image
                source={HeroImg}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                className="absolute bottom-12"
                onPress={handleHome}
            >
                <Text
                    className="text-white font-heading text-lg bg"
                >
                    Entrar
                </Text>
            </TouchableOpacity>
        </View>
    )
}