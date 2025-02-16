import * as WebBrowser from 'expo-web-browser';

import { View, Image, ScrollView, Text, StyleSheet } from 'react-native';
// import useLoginViewModel from '@/features/login/hooks/useLoginViewModel';
//@ts-ignore
import LoginImage from '@/assets/images/LandmarkLegendsLogin.webp';
import LoginForm from '@/features/login/components/LoginForm';
import Link from '@/components/ui/Link';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    // const { promptAsync } = useLoginViewModel();

    return (
        <ScrollView className='bg-background'>
            <View className='items-center'>
                <View>
                    <Text className="text-2xl font-bold text-foreground text-center">Login to</Text>
                    <Text className="text-4xl font-bold text-primary text-center">Landmark Legends</Text>

                    <Image style={styles.image} source={LoginImage} resizeMode="cover" />
                </View>

                <View className='mb-4 w-8/12 max-w-md'>
                    <LoginForm />
                </View>
                {/* <GoogleButton onPress={async () => await promptAsync()} /> */}
                <Link to="/auth/register">Don't have an account? Register</Link>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 16,
        width: 288,
        height: 288,
        alignSelf: 'center',
        marginVertical: 12,
    },
});