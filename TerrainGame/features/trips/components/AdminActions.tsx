import { View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import CustomButton from "@/components/ui/Buttons/CustomButton"

export interface AdminActionsProps {
    tripId: string
    onDelete?: (tripId: string) => void
}

function AdminActions({ onDelete, tripId }: AdminActionsProps) {
    const handleDelete = async () => {
        onDelete && onDelete(tripId)
    }

    return (
        <View>
            {onDelete && <CustomButton className="mt-2 bg-danger" onPress={handleDelete}>
                <Ionicons name="trash" size={24} color={'#fff'} />
            </CustomButton>}
        </View>
    )
}

export default AdminActions