import CircleButton from "@/components/ui/Buttons/CircleButton"
import CustomButton from "@/components/ui/Buttons/CustomButton"
import CustomInput from "@/components/ui/CustomInput"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import { View, Text } from "react-native"

function createTripModal() {
    const router = useRouter()

    const handleCloseModal = () => {
        router.back()
    }

    return (
        <View className="p-2 bg-background flex-1">
            <View className="flex-row gap-2 items-end">
                <CircleButton onPress={handleCloseModal}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </CircleButton>

                <Text className="text-lg text-primary">
                    Create Trip Modal
                </Text>
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    Trip Title
                </Text>

                <CustomInput />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    Trip Description
                </Text>

                <CustomInput />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    Country
                </Text>

                <CustomInput />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    City
                </Text>

                <CustomInput />
            </View>

            <View className="mt-3">
                <CustomButton>
                    <Text>Save</Text>
                </CustomButton>
            </View>
        </View>
    )
}

export default createTripModal