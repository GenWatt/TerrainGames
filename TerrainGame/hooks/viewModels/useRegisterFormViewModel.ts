import { IRegisterForm } from "@/types";
import { useState } from "react";
import useAuth from "../useAuth";
import { getError } from "@/api";

export default function useRegisterFormViewModel() {
    const { registerAsync, registerMutation } = useAuth();
    const [form, setForm] = useState<IRegisterForm>({
        username: '',
        password: '',
        email: '',
    })

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        await registerAsync(form);
    };

    const registerError = getError(registerMutation.error);
    return {
        registerMutation,
        form,
        handleChange,
        handleSubmit
    };
}