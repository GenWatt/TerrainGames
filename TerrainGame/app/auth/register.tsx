import RegisterForm from "@/components/RegisterForm";
import Link from "@/components/ui/Link";
import { View } from "react-native";

export default function Register() {
    return (
        <View>
            <RegisterForm />
            <Link to="/auth/login">Already have an account? Login</Link>
        </View>);
}