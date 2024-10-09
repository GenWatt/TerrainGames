import { ILoginForm } from "@/types";
import { useState } from "react";
import useAuth from "../useAuth";

export default function useLoginFormViewModel() {
    const { loginAsync, loginMutation } = useAuth();
    const [form, setForm] = useState<ILoginForm>({
        username: '',
        password: '',
    })

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        await loginAsync(form);
    };

    return {
        loginMutation,
        form,
        handleChange,
        handleSubmit,
    }
}