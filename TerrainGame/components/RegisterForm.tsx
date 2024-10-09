import { Button, View, Text } from "react-native";
import useRegisterFormViewModel from "@/hooks/viewModels/useRegisterFormViewModel";
import CustomInput from "./ui/CustomInput";
import NotificationText from "./ui/NotificationText";

export default function RegisterForm() {
    const { form, handleChange, handleSubmit, registerMutation } = useRegisterFormViewModel();

    return (
        <View>
            <View className="mb-4">
                <Text>Username</Text>
                <CustomInput
                    placeholder="Username"
                    value={form.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
            </View>

            <View className="mb-4">
                <Text>Email</Text>
                <CustomInput
                    placeholder="Email"
                    value={form.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
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

            {/* {registerMutation.error && <NotificationText type="error">{registerMutation.error.response?.data}</NotificationText>} */}
            <Button title="Register" onPress={handleSubmit} />
        </View>
    )
}