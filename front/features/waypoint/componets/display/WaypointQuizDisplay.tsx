import CustomButton from "@/components/ui/Buttons/CustomButton"
import CustomText from "@/components/ui/CustomText"
import { QuizWaypoint } from "@/features/shared/stores/createTripStore"
import Slider, { SliderRef } from "@/features/slider/components/Slider"
import { useRef } from "react"
import { FlatList, View } from "react-native"

export interface WaypointQuizDisplayProps {
    waypoint: QuizWaypoint
}

function WaypointQuizDisplay({ waypoint }: WaypointQuizDisplayProps) {
    const sliderRef = useRef<SliderRef>(null);

    return <View>
        <Slider
            ref={sliderRef}
            isAutoChanging={false}
            showIndicators={false}
            swipeEnabled={false}
            itemProps={{ className: 'h-auto' }}
        >
            {waypoint.quizes.map((quiz, index) => (
                <QuestionItem key={index} question={quiz} questionNumber={index + 1} />
            ))}
        </Slider>

        <View className="flex-row justify-between mt-2">
            <CustomButton
                onPress={() => {
                    sliderRef.current?.prevSlide();
                }}>
                <CustomText className="text-darkForeground">Prev</CustomText>
            </CustomButton>

            <CustomButton
                onPress={() => {
                    sliderRef.current?.nextSlide();
                }}>
                <CustomText className="text-darkForeground">Next</CustomText>
            </CustomButton>
        </View>
    </View>
}

export interface QuestionItemProps {
    question: QuizWaypoint['quizes'][number]
    questionNumber: number
}

function QuestionItem({ question, questionNumber }: QuestionItemProps) {
    return (
        <View>
            <CustomText className="text-2xl mb-2 font-bold">
                {questionNumber}. {question.question}
            </CustomText>
            <FlatList
                data={question.answers}
                numColumns={2} // Set number of columns
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View className="flex-1">
                        <CustomButton
                            onPress={() => {
                                // Handle answer selection
                            }}
                            className="w-full"
                        >
                            <CustomText className="text-darkForeground font-bold">
                                {index + 1}. {item}
                            </CustomText>
                        </CustomButton>
                    </View>
                )}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
            />
        </View>
    )
}

export default WaypointQuizDisplay