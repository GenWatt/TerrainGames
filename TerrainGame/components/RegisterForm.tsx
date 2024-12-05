import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import useRegisterFormViewModel from "@/hooks/viewModels/useRegisterFormViewModel";
import CustomInput from "./ui/CustomInput";
import NotificationText from "./ui/NotificationText";
import CustomButton from "./ui/Buttons/CustomButton";

export default function RegisterForm() {
    const { form, handleChange, handleSubmit, registerMutation } = useRegisterFormViewModel();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View>
                <View className="mb-4">
                    <Text className="text-foreground mb-2">Username</Text>
                    <CustomInput
                        placeholder="Username"
                        value={form.username}
                        onChangeText={(value) => handleChange('username', value)}
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-foreground mb-2">Email</Text>
                    <CustomInput
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(value) => handleChange('email', value)}
                        keyboardType="email-address"
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

                {/* {registerMutation.error && <NotificationText type="error">{registerMutation.error.response?.data}</NotificationText>} */}
                <CustomButton className="w-full" onPress={handleSubmit}>
                    <Text className="text-center text-2xl font-bold">Register</Text>
                </CustomButton>
            </View>
        </KeyboardAvoidingView>
    )
}