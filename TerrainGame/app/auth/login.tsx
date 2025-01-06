import * as WebBrowser from 'expo-web-browser';

import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
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
        <ScrollView className='bg-background'>
            <View className='items-center'>

                <View>
                    <Text className="text-2xl font-bold text-foreground text-center">Login to</Text>
                    <Text className="text-4xl font-bold text-primary">Landmark Legends</Text>

                    <Image className='rounded-2xl w-80 h-72 self-center my-3' source={LoginImage} resizeMode="cover" />
                </View>

                <View className='mb-4 w-8/12'>
                    <LoginForm />
                </View>
                {/* <GoogleButton onPress={async () => await promptAsync()} /> */}
                <Link to="/auth/register">Don't have an account? Register</Link>
            </View>
        </ScrollView>
    )
}