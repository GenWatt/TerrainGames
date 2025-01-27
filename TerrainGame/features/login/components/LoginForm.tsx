import useLoginFormViewModel from "@/features/login/hooks/useLoginFormViewModel";
import { View, Text, TextInput } from "react-native";
import { useEffect, useRef } from "react";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import CustomInput from "@/components/ui/CustomInput";

export interface ILoginFormProps {
    isFocus?: boolean;
}

export default function LoginForm({ isFocus = true }: ILoginFormProps) {
    const { form, handleChange, handleSubmit, error } = useLoginFormViewModel();
    const usernameRef = useRef<null | TextInput>(null);

    useEffect(() => {
        if (isFocus) {
            usernameRef.current?.focus();
        }
    }, [isFocus]);

    return (
        <View>
            <Text className="text-danger">{error}</Text>

            <View className="mb-4">
                <Text className="text-foreground mb-2">Username</Text>
                <CustomInput
                    ref={usernameRef}
                    placeholder="Username"
                    value={form.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
            </View>

            <View className="mb-4">
                <Text className="text-foreground mb-2">Password</Text>
                <CustomInput
                    placeholder="Password"
                    value={form.password}
                    onChangeText={(value) => handleChange('password', value)}
                    secureTextEntry
                />
            </View>

            <CustomButton className="w-full" onPress={handleSubmit}>
                <Text className="text-center text-2xl font-bold">Log In</Text>
            </CustomButton>
        </View>
    )
}