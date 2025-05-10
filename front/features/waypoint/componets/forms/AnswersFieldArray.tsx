import CustomButton from '@/components/ui/Buttons/CustomButton';
import CustomInput from '@/components/ui/CustomInput';
import Select from '@/components/ui/Select';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AnswersFieldArray: React.FC<{ quizIndex: number }> = ({ quizIndex }) => {
    const { control, getValues } = useFormContext();
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

    const icon = () => <Ionicons name="chevron-down" size={24} color={Colors.dark.foreground} />
    const items = getValues(`quizes.${quizIndex}.answers`).map((answer: string) => ({
        label: answer,
        value: answer,
    }))

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
                    <Select
                        onValueChange={onChange}
                        items={items}
                        value={value}
                        Icon={icon}
                    />
                )}
            />
        </>
    );
};

export default AnswersFieldArray