import { View, ActivityIndicator, Text } from 'react-native';

function Loader() {
    return (
        <View className="flex-1 justify-center items-center bg-background">
            <ActivityIndicator size="large" color="#00ff00" />
            <Text className="text-lg text-foreground mt-4">Loading...</Text>
        </View>
    )
}

export default Loader