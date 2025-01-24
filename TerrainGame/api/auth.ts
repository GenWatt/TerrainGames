import { IApiResult, ILoginForm, IRegisterForm } from "@/types";
import { landMarkApi } from "."
import { IUser } from "@/types";
import { AxiosResponse } from "axios";

export const loginWithGoogle = async (idToken: string) => {
    return await landMarkApi.post('/auth/register', { token: idToken });
}

export const getMe = async (): Promise<AxiosResponse<IUser, IApiResult>> => {
    const response = await landMarkApi.get('/auth/me');
    console.log('response', response);
    return response;
}

export const login = async (loginData: ILoginForm): Promise<AxiosResponse<IApiResult<IUser>, IApiResult>> => {
    return await landMarkApi.post('/auth/login', loginData);
}

export const register = async (loginData: IRegisterForm) => {
    return await landMarkApi.post('/auth/registerUser', loginData);
}