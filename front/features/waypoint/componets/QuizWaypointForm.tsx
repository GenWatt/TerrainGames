import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '@/constants/Colors';

const QuizWaypointForm: React.FC = () => {
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

const AnswersFieldArray: React.FC<{ quizIndex: number }> = ({ quizIndex }) => {
    const { control, setValue, getValues } = useFormContext();
    const { fields: answers, append, remove } = useFieldArray({
        control,
        name: `quizes.${quizIndex}.answers`,
    });

    const [newAnswer, setNewAnswer] = useState('');

    const handleAddAnswer = () => {
        if (newAnswer.trim()) {
            append(newAnswer);
            setNewAnswer('');
        }
    };

    return (
        <>
            <View className='flex-row gap-2 mb-3 flex-wrap'>
                {answers.map((answer, answerIndex) => (
                    <View
                        key={answer.id}
                        className="flex-row items-center justify-between border border-primary rounded-xl p-2"
                    >
                        <Text className='text-foreground'>{answerIndex + 1}. {getValues(`quizes.${quizIndex}.answers.${answerIndex}`)}</Text>
                        <CustomButton
                            onPress={() => remove(answerIndex)}
                            className="p-2 bg-transparent"
                        >
                            <Ionicons name="remove" size={16} color={Colors.dark.primary} />
                        </CustomButton>
                    </View>
                ))}
            </View>

            <View className="flex-row gap-2 items-center">
                <CustomInput
                    placeholder="Add new answer"
                    value={newAnswer}
                    onChangeText={setNewAnswer}
                    className="grow"
                />
                <CustomButton onPress={handleAddAnswer}>
                    <Ionicons name="add" size={20} color={Colors.dark.darkForeground} />
                </CustomButton>
            </View>

            <Text className="text-foreground mt-4 mb-2">Correct Answer</Text>
            <Controller
                control={control}
                name={`quizes.${quizIndex}.correctAnswer`}
                render={({ field: { onChange, value } }) => (
                    <RNPickerSelect
                        onValueChange={onChange}
                        items={getValues(`quizes.${quizIndex}.answers`).map((answer: string) => ({
                            label: answer,
                            value: answer,
                        }))}
                        value={value}
                        style={{
                            inputIOS: styles.inputIOS,
                            inputAndroid: styles.inputAndroid,
                            iconContainer: styles.iconContainer,
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => (
                            <Ionicons name="chevron-down" size={24} color={Colors.dark.foreground} />
                        )}
                    />
                )}
            />

        </>
    );
};

const styles = StyleSheet.create({
    inputIOS: {
        height: 50,
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    inputAndroid: {
        height: 50,
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 15,
        right: 12,
    },
});

export default QuizWaypointForm;
