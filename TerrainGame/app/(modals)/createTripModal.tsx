import useSaveTripMutation from "@/api/mutations/useSaveTripMutation"
import CircleButton from "@/components/ui/Buttons/CircleButton"
import CustomButton from "@/components/ui/Buttons/CustomButton"
import CustomInput from "@/components/ui/CustomInput"
import Colors from "@/constants/Colors"
import { ITripDetails, useCreateTripStore } from "@/store/createTripStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { View, Text } from "react-native"
import { useForm, Controller } from "react-hook-form"

function createTripModal() {
    const router = useRouter()
    const { mutateAsync } = useSaveTripMutation();
    const queryClient = useQueryClient();

    const { getTrip, tripDetails, updateTripDetails } = useCreateTripStore();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            country: '',
            city: ''
        }
    });

    const handleCloseModal = () => {
        router.back()
    }

    const onSubmit = async (data: ITripDetails) => {
        updateTripDetails(data);
        await mutateAsync(getTrip());
        queryClient.invalidateQueries({ queryKey: ["trips"] });
        router.back();
    };

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

                <Controller
                    control={control}
                    name="title"
                    rules={{ required: 'Title is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    Trip Description
                </Text>

                <Controller
                    control={control}
                    name="description"
                    rules={{ required: 'Description is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    Country
                </Text>

                <Controller
                    control={control}
                    name="country"
                    rules={{ required: 'Country is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View className="mt-2">
                <Text className="text-foreground mb-1">
                    City
                </Text>

                <Controller
                    control={control}
                    name="city"
                    rules={{ required: 'City is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View className="mt-3">
                <CustomButton className='flex-row gap-2 items-center' onPress={handleSubmit(onSubmit)}>
                    <Ionicons name="save" size={24} color={Colors.dark.darkForeground} />
                    <Text className="text-center text-2xl font-bold">Save</Text>
                </CustomButton>
            </View>
        </View>
    )
}

export default createTripModal