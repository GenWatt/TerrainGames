import React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import CustomInput from '@/components/ui/CustomInput';

interface TripFormFieldProps {
    control: any;
    name: string;
    label: string;
    rules?: object;
}

const TripFormField: React.FC<TripFormFieldProps> = ({ control, name, label, rules }) => (
    <View className="mt-2">
        <Text className="text-foreground mb-1">{label}</Text>
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}
        />
    </View>
);

export default TripFormField;