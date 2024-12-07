// InfoWaypointForm.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import CustomInput from '@/components/ui/CustomInput';

const InfoWaypointForm: React.FC = () => {
    const { control } = useFormContext();

    return (
        <>
            <View className="mb-4">
                <Text className='text-foreground mb-2'>Title</Text>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            placeholder="Title"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View className="mb-4">
                <Text className='text-foreground mb-2'>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            placeholder="Description"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>
        </>
    );
};

export default InfoWaypointForm;