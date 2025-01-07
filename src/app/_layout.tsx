import { useLoadFonts } from '@/hooks/useLoadFonts';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
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

            <Stack
                screenOptions={{
                    headerShown: false
                }}
            />
        </SafeAreaProvider>
    );
}