import { Feather } from "@expo/vector-icons";
import { Tabs, } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0020C7"
                },
                tabBarLabelPosition: 'beside-icon',
                tabBarItemStyle: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                },
            }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: () => (
                        <Feather name="home" size={24} color="#fff" />
                    ),
                }}
            />

            <Tabs.Screen
                name="round"
                options={{
                    tabBarLabel: 'Ronda',
                    tabBarIcon: () => (
                        <Feather name="truck" size={24} color="#fff" />
                    ),
                }}
            />
        </Tabs>
    )
}