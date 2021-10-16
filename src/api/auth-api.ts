import axios from "axios";
import {RequestType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd60dcf74-681a-4412-9b6b-cffe62026499'
    }
})
type AuthDataType = {
    id: number
    email: string
    login: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    me: () => {
        return instance.get<RequestType<AuthDataType>>('auth/me')
    },
    logIn: (loginData: LoginDataType) => {
        return instance.post<RequestType<{ userId: number }>>('/auth/login', loginData)
    },
    logOut: () => {
        return instance.delete<RequestType<{}>>('/auth/login')
    }
}