import useLoginFormViewModel from "@/hooks/viewModels/useLoginFormViewModel";
import { Button, View, Text, TextInput } from "react-native";
import CustomInput, { CustomInputProps } from "./ui/CustomInput";
import { useEffect, useRef } from "react";

export interface ILoginFormProps {
    isFocus?: boolean;
}

export default function LoginForm({ isFocus = true }: ILoginFormProps) {
    const { form, handleChange, handleSubmit } = useLoginFormViewModel();
    const usernameRef = useRef<null | TextInput>(null);

    useEffect(() => {
        if (isFocus) {
            usernameRef.current?.focus();
        }
    }, [isFocus]);

    return (
        <View className="justify-stretch w-full">
            <View className="mb-4">
                <Text>Username</Text>
                <CustomInput
                    ref={usernameRef}
                    placeholder="Username"
                    value={form.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
            </View>

            <View className="mb-4">
                <Text>Password</Text>
                <CustomInput
                    placeholder="Password"
                    value={form.password}
                    onChangeText={(value) => handleChange('password', value)}
                    secureTextEntry
                />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}