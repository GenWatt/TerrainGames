import useSaveTripMutation from '@/features/trips/api/useSaveTripMutation';
import { useCreateTripStore, ITripDetails, ITrip } from '@/features/shared/stores/createTripStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import useUpdateTripMutation from '../api/useUpdateTripMutation';

function useTripModal() {
    const router = useRouter();
    const { mutateAsync: saveTrip } = useSaveTripMutation();
    const { updateAction } = useUpdateTripMutation();
    const queryClient = useQueryClient();
    const { isEditing, trip, updateTripDetails } = useCreateTripStore();

    const handleCloseModal = () => {
        router.back();
    };

    const sendToApi = async (data: Omit<ITripDetails, 'position'>, trip: ITrip) => {
        const newTrip: ITrip = {
            ...trip,
            tripDetails: {
                ...data,
                position: trip.tripDetails.position,
            }
        }

        updateTripDetails(newTrip.tripDetails);

        if (isEditing) {
            await updateAction(newTrip);
        } else {
            await saveTrip(newTrip);
        }
    }

    const handleSubmit = async (data: ITripDetails) => {
        await sendToApi(data, trip);
        invalidateTrips();
        router.back();
    };

    const invalidateTrips = () => {
        queryClient.invalidateQueries({ queryKey: ["trips"] });
    }

    return { handleCloseModal, handleSubmit, isEditing }
}

export default useTripModal