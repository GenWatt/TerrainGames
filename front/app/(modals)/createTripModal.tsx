import { View } from "react-native"
import TripForm from "@/features/trips/components/TripForm"
import TripModalHeader from "@/features/trips/components/TripModalHeader"
import useTripModal from "@/features/trips/hooks/useTripModal";

function createTripModal() {
    const { handleCloseModal, handleSubmit, isEditing } = useTripModal();

    return (
        <View className="p-2 bg-background flex-1">
            <TripModalHeader isEditing={isEditing} onClose={handleCloseModal} />
            <TripForm isEditing={isEditing} onSubmit={handleSubmit} />
        </View>
    );
}

export default createTripModal