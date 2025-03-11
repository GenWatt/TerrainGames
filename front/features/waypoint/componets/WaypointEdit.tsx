import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { IWaypoint, WaypointTypes } from '@/features/shared/stores/createTripStore';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import InfoWaypointForm from './forms/InfoWaypointForm';
import QuizWaypointForm from './forms/QuizWaypointForm';
import Select from '@/components/ui/Select';

interface WaypointEditProps {
    waypoint: IWaypoint;
    onSave: (waypoint: IWaypoint) => void;
    onDelete: (waypoint: IWaypoint) => void;
}

const WaypointEdit: React.FC<WaypointEditProps> = ({ waypoint, onSave, onDelete }) => {
    const methods = useForm<IWaypoint>({
        defaultValues: waypoint,
    });

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

    const items = Object.values(WaypointTypes).map((type) => ({
        label: type,
        value: type,
    }))
    const icon = () => (<Ionicons name="chevron-down" size={24} color={Colors.dark.foreground} />)

    return (
        <FormProvider {...methods}>
            <View className="justify-stretch w-full p-4">
                <View className="mb-4">
                    <Text className='text-foreground mb-2'>Waypoint Type</Text>
                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={onChange}
                                items={items}
                                value={value}
                                Icon={icon}
                            />
                        )}
                    />
                </View>

                {selectedType === WaypointTypes.INFO && <InfoWaypointForm />}
                {selectedType === WaypointTypes.QUIZ && <QuizWaypointForm />}

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


export default WaypointEdit;