import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import AvatarImg from "@/assets/avatar-example.png";
import LogoImg from "@/assets/logo.png";
import { Button } from "@/components/Button";

import { formatDistanceToNowStrict, nextMonday, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
    const now = new Date();

    const nextMondayOn14 = set(nextMonday(now), { hours: 14 });

    const difference = formatDistanceToNowStrict(nextMondayOn14, {
        locale: ptBR,
        addSuffix: true,
    });

    return (
        <SafeAreaView className="py-10 px-20 items-center justify-between flex-1 w-full">
            <Image
                source={LogoImg}
                className="absolute top-10 right-4"
            />

            <View className="gap-6 items-center w-full">
                <Image
                    source={AvatarImg}
                    className="rounded-full"
                />

                <Text className="text-center font-heading text-base">Bem vindo(a) de volta Maria</Text>

                <Text className="text-center font-body text-zinc-400 text-base">Deseja solicitar o serviço de coleta?</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-blue p-4 rounded-full w-full max-w-[238px]"
                >
                    <Text className="text-xl font-heading text-white text-center">Solicitar</Text>
                </TouchableOpacity>

                <Text className="text-center font-body text-zinc-400 text-base">A nossa equipe fará a próxima coleta {difference}</Text>
            </View>

            <Button
                title="Editar perfil"
            />
        </SafeAreaView>
    )
}