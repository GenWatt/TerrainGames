import { TextInput, TextInputProps } from "react-native";

export interface CustomInputProps extends TextInputProps { }

export default function CustomInput({ ...props }: CustomInputProps) {
    return <TextInput
        className="border-black border rounded-2xl px-4 py-2 items-center flex-row gap-3 hover:bg-black"
        {...props} />;
}