
import { View, Text } from 'react-native';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import AnswersFieldArray from './AnswersFieldArray';

const QuizWaypointForm = () => {
    const { control } = useFormContext();
    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: 'quizes',
    });

    const handleAddQuiz = () => {
        append({
            question: '',
            answers: [],
            correctAnswer: '',
        });
    };

    return (
        <View>
            {questions.map((quiz, quizIndex) => (
                <View key={quiz.id} className="mb-2 border-b-2 border-primary pb-4">
                    <Text className="text-foreground mb-2">Question {quizIndex + 1}</Text>
                    <Controller
                        control={control}
                        name={`quizes.${quizIndex}.question`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput
                                placeholder="Enter question"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text className="text-foreground mt-4 mb-2">Answers</Text>
                    <AnswersFieldArray quizIndex={quizIndex} />

                    <CustomButton
                        onPress={() => remove(quizIndex)}
                        className="mt-4 flex-row items-center"
                    >
                        <Ionicons name="trash" size={20} color={Colors.dark.darkForeground} />
                        <Text>Remove Question</Text>
                    </CustomButton>
                </View>
            ))}

            <CustomButton
                onPress={handleAddQuiz}
                className="my-4 flex-row items-center"
            >
                <Ionicons name="add" size={24} color={Colors.dark.darkForeground} />
                <Text>Add Question</Text>
            </CustomButton>
        </View>
    );
};

export default QuizWaypointForm;
