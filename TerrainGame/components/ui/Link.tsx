import { TextProps, TouchableOpacity } from "react-native";
import NotificationText from "./NotificationText";
import { useRouter } from "expo-router";

export interface LinkProps extends TextProps {
    to: string;
    replace?: boolean;
}

export default function Link({ to, replace, ...props }: LinkProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push({ pathname: to, params: {} });
    }

    return <TouchableOpacity onPress={handlePress}>
        <NotificationText type="info" {...props} />
    </TouchableOpacity>;
}