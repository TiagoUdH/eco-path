import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import HeroImg from "@/assets/hero.png";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";

export default function Index() {
    const { login } = useContext(UserContext)

    const router = useRouter()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleHome() {
        await login(username, password)
    }

    return (
        <View className="bg-blue flex-1 justify-center items-center gap-16 p-10">
            <Image
                source={HeroImg}
            />

            <View className="gap-5 w-full">
                <View className="w-full gap-2">
                    <Text className="text-white font-heading text-lg" >Username:</Text>

                    <TextInput
                        placeholder="username"
                        value={username}
                        onChangeText={setUsername}
                        className="font-body text-lg bg-white rounded-2xl p-4"
                    />
                </View>

                <View className="w-full gap-3">
                    <Text className="text-white font-heading text-lg" >Senha:</Text>

                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        className="font-body text-lg bg-white rounded-2xl w-full p-4"
                        secureTextEntry
                    />
                </View>
            </View>

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