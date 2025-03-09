import { View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import CustomButton from "@/components/ui/Buttons/CustomButton"
import Colors from "@/constants/Colors"

export interface AdminActionsProps {
    tripId: string
    onDelete?: (tripId: string) => void
    onEdit?: (tripId: string) => void
}

function AdminActions({ onDelete, tripId, onEdit }: AdminActionsProps) {
    const handleDelete = async () => {
        onDelete && onDelete(tripId)
    }

    return (
        <View className="flex-row gap-3">
            {onEdit && <CustomButton className="mt-2 bg-primary" onPress={() => onEdit(tripId)}>
                <Ionicons name="create" size={20} color={Colors.dark.background} />
            </CustomButton>}

            {onDelete && <CustomButton className="mt-2 bg-danger" onPress={handleDelete}>
                <Ionicons name="trash" size={20} color={Colors.dark.background} />
            </CustomButton>}
        </View>
    )
}

export default AdminActions