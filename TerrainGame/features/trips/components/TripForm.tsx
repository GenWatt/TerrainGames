import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import TripFormField from './TripFormField';
import useTripForm from '../hooks/useTripForm';
import { ITripDetails } from '@/features/shared/stores/createTripStore';

interface TripFormProps {
    isEditing: boolean;
    onSubmit: (data: ITripDetails) => void;
}

const TripForm: React.FC<TripFormProps> = ({ isEditing, onSubmit }) => {
    const { control, handleSubmit, errors } = useTripForm();

    return (
        <View>
            <TripFormField
                control={control}
                name="title"
                label="Trip Title"
                rules={{ required: 'Title is required' }}
            />
            <TripFormField
                control={control}
                name="description"
                label="Trip Description"
                rules={{ required: 'Description is required' }}
            />
            <TripFormField
                control={control}
                name="country"
                label="Country"
                rules={{ required: 'Country is required' }}
            />
            <TripFormField
                control={control}
                name="city"
                label="City"
                rules={{ required: 'City is required' }}
            />

            <View className="mt-3">
                <CustomButton className='flex-row gap-2 items-center' onPress={handleSubmit(onSubmit)}>
                    <Ionicons name="save" size={24} color={Colors.dark.darkForeground} />
                    <Text className="text-center text-2xl font-bold">
                        {isEditing ? 'Edit' : 'Create'}
                    </Text>
                </CustomButton>
            </View>
        </View>
    );
};

export default TripForm;