import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ITripDetails, useCreateTripStore } from '@/features/shared/stores/createTripStore';

export default function useTripForm() {
    const { trip, isEditing } = useCreateTripStore();
    const tripDetails = trip.tripDetails;

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ITripDetails>({
        defaultValues: {
            title: '',
            description: '',
            country: '',
            city: ''
        }
    });

    useEffect(() => {
        if (isEditing && tripDetails) {
            reset({
                title: tripDetails.title,
                description: tripDetails.description,
                country: tripDetails.country,
                city: tripDetails.city
            });
        }
    }, [isEditing, tripDetails, reset]);


    return {
        control,
        handleSubmit,
        errors,
    };
}