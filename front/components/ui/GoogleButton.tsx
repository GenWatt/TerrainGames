import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, ViewStyle, Pressable } from "react-native";

export type GoogleButtonProps = {
    onPress: () => void;
    title?: string;
    stylesButton?: ViewStyle
}

export default function GoogleButton({ onPress, title = "Sign in with Google", stylesButton }: GoogleButtonProps) {
    return (
        <Pressable
            className="border-black border rounded-2xl p-3 items-center flex-row gap-3 hover:bg-black"
            style={[stylesButton]}
            onPress={onPress}>
            <Ionicons name="logo-google" size={24} color={"#FFF"} />
            <Text className="text-center">{title}</Text>
        </Pressable>
    )
}