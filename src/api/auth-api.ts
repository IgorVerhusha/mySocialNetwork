import { profileType } from "../Redux/types/types";
import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";



type MeResponseDataType = { id: number; email: string; login: string };

type LoginResponseDataType = { id: number };


export const authAPI = {
  auth() {
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((response) => response.data);
  },
  setAuthProfile(id: number) {
    return instance
      .get<profileType>(`profile/${id}`)
      .then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};
