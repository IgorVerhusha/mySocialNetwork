import axios from "axios"
import {userType} from "../Redux/types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "a7708531-0e49-48f3-ad2c-d33a80bebb3f",
    },
})

export type UsersAPIType = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

export enum ResultCodeEnum {
    success = 0,
    error = 1,
}

export enum ResultCodeForCaptcha {
    captchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;
};

