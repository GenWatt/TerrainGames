import { IRegisterForm } from "@/types";
import { useState } from "react";
import useAuth from "../useAuth";
import useError from "../useError";

export default function useRegisterFormViewModel() {
    const { registerAsync, registerMutation } = useAuth();
    const { getErrorMessage } = useError();
    const [form, setForm] = useState<IRegisterForm>({
        username: '',
        password: '',
        email: '',
    })
    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await registerAsync(form);
        } catch (error) {
            setError(getErrorMessage(error));
        }
    };

    return {
        registerMutation,
        form,
        handleChange,
        handleSubmit,
        error
    };
}