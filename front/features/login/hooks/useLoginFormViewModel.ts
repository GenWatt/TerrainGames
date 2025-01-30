import { ILoginForm } from "@/types";
import { useState } from "react";
import useAuth from "../../shared/hooks/useAuth";
import useError from "../../shared/hooks/useError";

export default function useLoginFormViewModel() {
    const { loginAsync, loginMutation } = useAuth();
    const { getErrorMessage } = useError();
    const [form, setForm] = useState<ILoginForm>({
        username: '',
        password: '',
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
            setError(null);
            await loginAsync(form);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return {
        loginMutation,
        form,
        handleChange,
        handleSubmit,
        error
    }
}