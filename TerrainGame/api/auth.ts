import { IApiResult, ILoginForm, IRegisterForm } from "@/types";
import { landMarkApi } from "."
import { IUser } from "@/types";
import { AxiosResponse } from "axios";

export const loginWithGoogle = async (idToken: string) => {
    console.log("lole" + landMarkApi.defaults.baseURL);
    return await landMarkApi.post('/auth/register', { token: idToken });
}

export const getMe = async (): Promise<AxiosResponse<IUser, IApiResult>> => {
    console.log("lole" + landMarkApi.defaults.baseURL);
    return await landMarkApi.get('/auth/me');
}

export const login = async (loginData: ILoginForm): Promise<AxiosResponse<IUser, IApiResult>> => {
    return await landMarkApi.post('/auth/login', loginData);
}

export const register = async (loginData: IRegisterForm) => {
    return await landMarkApi.post('/auth/registerUser', loginData);
}