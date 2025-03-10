import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { IWaypoint, WaypointTypes } from '@/features/shared/stores/createTripStore';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import InfoWaypointForm from './InfoWaypointForm';
import QuizWaypointForm from './QuizWaypointForm';

interface WaypointEditProps {
    waypoint: IWaypoint;
    onSave: (waypoint: IWaypoint) => void;
    onDelete: (waypoint: IWaypoint) => void;
}

const WaypointEdit: React.FC<WaypointEditProps> = ({ waypoint, onSave, onDelete }) => {
    const methods = useForm<IWaypoint>({
        defaultValues: waypoint,
    });
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleAddImageUrl = (field: any) => {
        if (newImageUrl.trim() !== '') {
            field.onChange([...(field.value || []), newImageUrl]);
            setNewImageUrl('');
        }
    };

    const { control, watch, reset } = methods;
    const selectedType = watch('type');

    useEffect(() => {
        reset(waypoint);
    }, [waypoint, reset]);

    const handleSave = () => {
        const newValues = methods.getValues();

        onSave(newValues);
    };

    const handleDelete = () => {
        onDelete(waypoint);
    }

    return (
        <FormProvider {...methods}>
            <View className="justify-stretch w-full p-4">
                <View className="mb-4">
                    <Text className='text-foreground mb-2'>Waypoint Type</Text>
                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                            <RNPickerSelect
                                onValueChange={onChange}
                                items={Object.values(WaypointTypes).map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                                value={value}
                                style={{
                                    inputIOS: styles.inputIOS,
                                    inputAndroid: styles.inputAndroid,
                                    iconContainer: styles.iconContainer
                                }}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => (<Ionicons name="chevron-down" size={24} color={Colors.dark.foreground} />)}
                            />
                        )}
                    />
                </View>

                {selectedType === WaypointTypes.INFO && <InfoWaypointForm />}
                {selectedType === WaypointTypes.QUIZ && <QuizWaypointForm />}
                {/* {selectedType === WaypointTypes.TASK && <TaskWaypointForm />} */}

                <View className='flex-row gap-2'>
                    <CustomButton className='flex-row gap-2 items-center' onPress={handleSave}>
                        <Ionicons name="save" size={24} color={Colors.dark.darkForeground} />
                        <Text className="text-center text-2xl font-bold">Save</Text>
                    </CustomButton>

                    <CustomButton className='flex-row gap-2 items-center' onPress={handleDelete}>
                        <Ionicons name="remove-circle" size={24} color={Colors.dark.darkForeground} />
                        <Text className="text-center text-2xl font-bold">Delete</Text>
                    </CustomButton>
                </View>
            </View>
        </FormProvider>
    );
};

const styles = StyleSheet.create({
    inputIOS: {
        height: 50,
        width: '100%',
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    inputAndroid: {
        height: 50,
        width: '100%',
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 15,
        right: 12,
        backgroundColor: 'transparent',
    },
});

export default WaypointEdit;