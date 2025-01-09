import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";

import AvatarImg from "@/assets/avatar-example.png";
import LogoImg from "@/assets/logo.png";
import { useRouter } from "expo-router";

const DATA = [
    {
        id: '1',
        day: '20/07',
        collectedDay: '22/07'
    },
    {
        id: '2',
        day: '07/07',
        collectedDay: '13/07'
    }
];


export default function Profile() {
    const router = useRouter()

    function handleGoBack() {
        router.navigate("/home")
    }

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
                <Text className="text-xl font-body">Nome: Maria</Text>
                <Text className="text-xl font-body">Idade: 23</Text>
                <Text className="text-xl font-body">Número: (35) 98765-1234</Text>
                <View><Text className="text-xl font-body">Endereço: Rua das Flores, 123</Text>
                    <Text className="text-xl font-body">Bairro Jardim das Rosas</Text></View>
            </View>

            <View className="bg-blue flex-1 w-full p-8">
                <Text className="text-base font-heading text-white mb-3">Últimas Solicitações</Text>

                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <View className="bg-indigo-400 py-4 px-6 mb-6 gap-2">
                            <Text className="text-white font-body">Dia {item.day}</Text>

                            <View>
                                <Text className="text-white font-body">Solicitado com sucesso!</Text>
                                <Text className="text-white font-body">Recebido dia {item.collectedDay}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}