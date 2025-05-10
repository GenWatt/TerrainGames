import { useCreateTripStore } from "@/features/shared/stores/createTripStore";
import { useTripStore, AppModes } from "@/features/shared/stores/TripStore";
import useDeleteTripMutation from "@/features/trips/api/useDeleteTripMutation";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState, useCallback } from "react";
import { CloseSheetReason, TripDetailsSheetProps } from "../components/TripDetailsSheet";

export interface TripDetailsSheetHookProps extends TripDetailsSheetProps {

}

function useTripDetailsSheet({ trip, onClose }: TripDetailsSheetHookProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const tripDetails = trip.tripDetails;
    const { deleteAction } = useDeleteTripMutation()
    const { editTrip } = useCreateTripStore()

    const { changeMode } = useTripStore();
    const [reason, setReason] = useState<CloseSheetReason | null>(null);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1 && reason !== CloseSheetReason.EDIT) {
            changeMode(AppModes.VIEW);
        }

        onClose?.(reason || CloseSheetReason.CLOSE);
    }, [reason]);

    const handleStartTrip = () => {
        changeMode(AppModes.ACTIVE_TRIP);
        setReason(CloseSheetReason.START);
        bottomSheetRef.current?.close();
    }

    const handleDelete = () => {
        deleteAction(trip._id || '');

        setReason(CloseSheetReason.DELETE);
        bottomSheetRef.current?.close();
    }

    const handleEdit = () => {
        bottomSheetRef.current?.close();
        setReason(CloseSheetReason.EDIT);
        editTrip(trip);
    }

    return {
        tripDetails,
        bottomSheetRef,
        handleSheetChanges,
        handleStartTrip,
        handleDelete,
        handleEdit,
    }
}

export default useTripDetailsSheet;