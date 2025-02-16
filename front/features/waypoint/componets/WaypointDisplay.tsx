import { View, Pressable, Text, Image } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { IWaypoint } from '@/features/shared/stores/createTripStore';
// import { ChevronRight, Info, HelpCircle, ClipboardList } from 'lucide-react-native';
import React from 'react';
// import { BlurView } from 'expo-blur';

export interface WaypointDisplayProps {
    waypoint: IWaypoint;
}

const WaypointDisplay: React.FC<WaypointDisplayProps> = ({ waypoint }) => {
    const renderIcon = () => {
        const iconSize = 24;
        const iconClass = 'text-primary';

        switch (waypoint.type) {
            case 'INFO':
            // return <Info size={iconSize} className={iconClass} />;
            case 'QUIZ':
            // return <HelpCircle size={iconSize} className={iconClass} />;
            case 'TASK':
            // return <ClipboardList size={iconSize} className={iconClass} />;
        }

        return null;
    };

    return (
        <Animated.View
            entering={FadeIn.duration(800)}
            exiting={FadeOut.duration(200)}
            className="bg-card rounded-2xl p-4 shadow-lg overflow-hidden"
        >
            {/* Header */}
            <View className="flex-row items-center mb-4">
                <View className="bg-primary/10 p-2 rounded-lg">
                    {renderIcon()}
                </View>
                <View className="ml-3 flex-1">
                    <Text className="text-2xl font-bold text-foreground">
                        {waypoint.title}
                    </Text>
                    <Text className="text-sm text-muted-foreground mt-1 text-foreground2">
                        {waypoint.description}
                    </Text>
                </View>
            </View>

            {/* Content */}
            <Animated.View className="space-y-4">
                {waypoint.type === 'INFO' && (
                    <Animated.View
                        entering={SlideInDown.springify()}
                        className="bg-muted/20 p-4 rounded-lg"
                    >
                        <Text className="text-base text-foreground leading-relaxed">
                            {waypoint.text}
                        </Text>
                        <View className="mt-3 flex-row flex-wrap gap-2">
                            {waypoint.imageUrls.map((url, index) => (
                                <Animated.View
                                    key={index}
                                    entering={ZoomIn.delay(index * 100)}
                                    exiting={ZoomOut}
                                >
                                    <Pressable>
                                        <Image
                                            source={{ uri: url }}
                                            className="w-24 h-24 rounded-lg"
                                        // placeholder={<Spinner />}
                                        // transition={300}
                                        />
                                        {/* <BlurView
                                            intensity={30}
                                            className="absolute inset-0 rounded-lg items-center justify-center"
                                        >
                                            <ChevronRight className="text-primary" size={20} />
                                        </BlurView> */}
                                    </Pressable>
                                </Animated.View>
                            ))}
                        </View>
                    </Animated.View>
                )}

                {waypoint.type === 'QUIZ' && (
                    <View className="space-y-4">
                        {waypoint.quizes.map((quiz, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeIn.delay(index * 100)}
                                className="bg-muted/10 p-4 rounded-xl border border-border"
                            >
                                <Text className="text-lg font-medium text-foreground mb-3">
                                    {quiz.question}
                                </Text>

                                <View className="flex-row flex-wrap gap-2 mb-3">
                                    {quiz.imageUrls.map((url, idx) => (
                                        <Image
                                            key={idx}
                                            source={{ uri: url }}
                                            className="w-16 h-16 rounded-lg"
                                        // placeholder={<Spinner />}
                                        // transition={300}
                                        />
                                    ))}
                                </View>

                                <View className="space-y-2">
                                    {quiz.answers.map((answer, idx) => (
                                        <Pressable
                                            key={idx}
                                            className="p-3 bg-muted/20 rounded-lg border border-transparent active:border-primary"
                                        >
                                            <Text className="text-base text-foreground">{answer}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                )}

                {waypoint.type === 'TASK' && (
                    <Animated.View
                        entering={SlideInDown.springify()}
                        className="space-y-4"
                    >
                        <View className="bg-muted/10 p-4 rounded-lg">
                            <Text className="text-base text-foreground font-medium mb-2">
                                Task Description
                            </Text>
                            <Text className="text-muted-foreground leading-relaxed">
                                {waypoint.taskDescription}
                            </Text>
                        </View>

                        <View className="flex-row flex-wrap gap-2">
                            {waypoint.taskImages.map((url, index) => (
                                <Animated.View
                                    key={index}
                                    entering={ZoomIn.delay(index * 100)}
                                    exiting={ZoomOut}
                                >
                                    <Image
                                        source={{ uri: url }}
                                        className="w-24 h-24 rounded-lg"
                                    // placeholder={<Spinner />}
                                    // transition={300}
                                    />
                                </Animated.View>
                            ))}
                        </View>
                    </Animated.View>
                )}
            </Animated.View>

            {/* Type Badge */}
            <View className="absolute top-2 right-2 bg-background/90 px-3 py-1 rounded-full">
                <Text className="text-xs font-medium text-primary">
                    {waypoint.type.charAt(0) + waypoint.type.slice(1).toLowerCase()}
                </Text>
            </View>
        </Animated.View>
    );
};

export default React.memo(WaypointDisplay);