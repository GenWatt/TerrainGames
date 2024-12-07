import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';

const Header: React.FC<{ title: string }> = ({ title }) => {
    const router = useRouter();

    return (
        <View className='bg-darkForeground flex-row gap-4 items-center p-3 border-b-4 border-primary'>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.dark.foreground} />
            </TouchableOpacity>
            <Text className='text-foreground text-2xl'>{title}</Text>
        </View>
    );
};

export default Header;