import useLoginFormViewModel from "@/hooks/viewModels/useLoginFormViewModel";
import { Button, View, Text } from "react-native";
import CustomInput from "./ui/CustomInput";

export default function LoginForm() {
    const { form, handleChange, handleSubmit } = useLoginFormViewModel();

    return (
        <View className="justify-stretch w-full">
            <View className="mb-4">
                <Text>Username</Text>
                <CustomInput
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