// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Text, View } from 'react-native';

export interface TabBarIconProps extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  text?: string;
}

export function TabBarIcon({ style, text, ...rest }: TabBarIconProps) {
  return <View className='relative'>
    <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    {text && <View className=' bg-primary rounded-lg p-1 absolute top-4'>
      <Text className='text-black text-2xs'>{text}</Text>
    </View>}
  </View>;
}
