import RegisterForm from "@/features/register/components/RegisterForm";
import Link from "@/components/ui/Link";
import { ScrollView, View, Text, Image, KeyboardAvoidingView, Platform } from "react-native";
import RegisterImage from "@/assets/images/RegisterImage.png";

export default function Register() {
    return (
        <ScrollView className="bg-background p-2">
            <View className="items-center">
                <View>
                    <Text className="text-2xl font-bold text-foreground text-center">Register to</Text>
                    <Text className="text-4xl font-bold text-primary">Landmark Legends</Text>

                    <Image className="rounded-xl w-80 h-48 self-center my-3" source={RegisterImage} resizeMode="cover" />
                </View>

                <View className="mb-4 w-8/12 p-2">
                    <RegisterForm />
                    <Link className="text-center mt-2" to="/auth/login">Already have an account? Login</Link>
                </View>
            </View>
        </ScrollView>)
}