import * as WebBrowser from 'expo-web-browser';

import { View, Image, StyleSheet } from 'react-native';
import GoogleButton from '@/components/ui/GoogleButton';
import useLoginViewModel from '@/hooks/viewModels/useLoginViewModel';
//@ts-ignore
import LoginImage from '@/assets/images/LandmarkLegendsLogin.webp';
import LoginForm from '@/components/LoginForm';
import Link from '@/components/ui/Link';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const { promptAsync } = useLoginViewModel();

    return (
        <View className='items-center'>
            <Image style={styles.loginImage} source={LoginImage} resizeMode="contain" />
            <View className='mb-4'>
                <LoginForm />
            </View>
            <GoogleButton onPress={async () => await promptAsync()} />
            <Link to="/auth/register">Don't have an account? Register</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    loginImage: {
        width: '100%',
        height: 300,
        marginBottom: 16,
    }
})
