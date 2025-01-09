import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string
}

export function Button({ title, ...rest }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-blue rounded-full w-full"
            style={{ padding: 8, maxWidth: 180 }}
            {...rest}
        >
            <Text className="text-base font-body text-white text-center">{title}</Text>
        </TouchableOpacity>
    )
}