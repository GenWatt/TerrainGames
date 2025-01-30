import { TextProps } from "react-native";
import { Text } from "react-native";

export interface NotificationTextProps extends TextProps {
    type: 'success' | 'error' | 'info';
}

export default function NotificationText({ type, children, className, ...props }: NotificationTextProps) {
    const finalClass = getClass();

    function getClass() {
        switch (type) {
            case 'success':
                return 'text-green-500';
            case 'error':
                return 'text-red-500';
            case 'info':
                return 'text-lime-300';
            default:
                return '';
        }
    }

    return (
        <Text
            className={`${finalClass} ${className}`}
            {...props}>
            {children}
        </Text>
    );
}