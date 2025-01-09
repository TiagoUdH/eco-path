import { useLoadFonts } from '@/hooks/useLoadFonts';
import { Stack } from 'expo-router';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import "../global.css";

export default function RootLayout() {
    const { fontsLoaded } = useLoadFonts();

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            {!fontsLoaded ? (
                <View className="bg-blue flex-1 justify-center items-center">
                    <ActivityIndicator className="text-white" />
                </View>
            ) : (
                <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                />
            )}

        </SafeAreaProvider>
    );
}