import { UserContext } from "@/contexts/UserContext";
import { Feather } from "@expo/vector-icons";
import { Tabs, } from "expo-router";
import { useContext } from "react";

export default function TabsLayout() {
    const { user } = useContext(UserContext)

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0020C7",
                },
                tabBarLabelPosition: 'below-icon',
                tabBarItemStyle: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
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
                name="collect-points"
                options={{
                    tabBarLabel: 'Solicitações',
                    tabBarIcon: () => (
                        <Feather name="mail" size={24} color="#fff" />
                    ),
                    href: !user.driver ? null : '/(tabs)/collect-points'
                }}
            />

            <Tabs.Screen
                name="round"
                options={{
                    tabBarLabel: 'Coleta',
                    tabBarIcon: () => (
                        <Feather name="truck" size={24} color="#fff" />
                    ),
                    href: !user.driver ? null : '/(tabs)/round'
                }}
            />
        </Tabs>
    )
}