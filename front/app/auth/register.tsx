import RegisterForm from "@/features/register/components/RegisterForm";
import Link from "@/components/ui/Link";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
//@ts-ignore
import RegisterImage from "@/assets/images/RegisterImage.png";

export default function Register() {
    return (
        <ScrollView className="bg-background p-2">
            <View className="items-center">
                <View>
                    <Text className="text-2xl font-bold text-foreground text-center">Register to</Text>
                    <Text className="text-4xl font-bold text-primary text-center">Landmark Legends</Text>

                    <Image style={styles.image} source={RegisterImage} resizeMode="cover" />
                </View>

                <View className="mb-4 w-8/12 p-2 max-w-md">
                    <RegisterForm />
                    <Link className="text-center mt-2" to="/auth/login">Already have an account? Login</Link>
                </View>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 16, // rounded-2xl
        width: 288, // w-72 (72 * 4 px)
        height: 288, // h-72
        alignSelf: 'center',
        marginVertical: 12, // my-3 (3 * 4 px)
    },
});