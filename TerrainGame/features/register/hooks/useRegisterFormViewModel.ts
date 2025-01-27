import useAuth from "@/features/shared/hooks/useAuth";
import useError from "@/features/shared/hooks/useError";
import { IRegisterForm } from "@/types";
import { useState } from "react";

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