import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import CustomInput from "../../../components/ui/CustomInput";
import CustomButton from "../../../components/ui/Buttons/CustomButton";
import useRegisterFormViewModel from "@/features/register/hooks/useRegisterFormViewModel";

export default function RegisterForm() {
    const { form, handleChange, handleSubmit, error } = useRegisterFormViewModel();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <Text className="text-danger">{error}</Text>

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

                    <CustomButton className="w-full" onPress={handleSubmit}>
                        <Text className="text-center text-2xl font-bold">Register</Text>
                    </CustomButton>
                </View>
                <View style={styles.bottomPadding} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = {
    bottomPadding: {
        paddingBottom: 200, // Adjust the value as needed
    },
};