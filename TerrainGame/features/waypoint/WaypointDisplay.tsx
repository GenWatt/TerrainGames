import React from 'react';
import { View, Text, Image } from 'react-native';
import { Waypoint } from '@/store/createTripStore';

interface WaypointDisplayProps {
    waypoint: Waypoint;
}

const WaypointDisplay: React.FC<WaypointDisplayProps> = ({ waypoint }) => {
    return (
        <View>
            <Text>{waypoint.title}</Text>
            <Text>{waypoint.description}</Text>

            {waypoint.type === 'INFO' && <Text>{waypoint.text}</Text>}
            {waypoint.type === 'QUIZ' && waypoint.quizes.map((quiz, index) => (
                <View key={index}>
                    <Text>{quiz.question}</Text>
                    {quiz.imageUrls.map((url, idx) => (
                        <Image key={idx} source={{ uri: url }} style={{ width: 100, height: 100 }} />
                    ))}
                </View>
            ))}
            {waypoint.type === 'TASK' && (
                <View>
                    <Text>{waypoint.taskDescription}</Text>
                    {waypoint.taskImages.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100 }} />
                    ))}
                </View>
            )}
        </View>
    );
};

export default WaypointDisplay;