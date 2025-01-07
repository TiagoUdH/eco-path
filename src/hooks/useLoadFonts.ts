import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

export function useLoadFonts() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });

    return { fontsLoaded };
}