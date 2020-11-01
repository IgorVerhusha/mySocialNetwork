import axios from "axios"
import {profileType, userType} from "../Redux/types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "a7708531-0e49-48f3-ad2c-d33a80bebb3f",
  },
})

type UsersAPIType = {
  items: Array<userType>
  totalCount: number
  error: string|null
}

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },

  follow(id: number) {
    return instance.post(`follow/${id}`, {}).then((response) => response.data)
  },

  unfollow(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  },
}

export const profileAPI = {
  getProfile(id: number) {
    return instance.get<profileType>(`profile/${id}`).then((response) => response.data)
  },
  getStatus(id: number) {
    return instance
      .get<string>(`profile/status/${id}`)
      .then((response) => response.data)
  },
  updateStatus(status: string) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => response.data)
  },
  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
  },
  saveProfile(formData: profileType) {
    return instance.put(`profile`, formData).then((response) => response.data)
  },
}

export enum ResultCodeEnum {
  success = 0,
  error = 1,
}
export enum ResultCodeForCaptcha {
  captchaIsRequired = 10,
}
type AuthMeType = {
  data: { id: number; email: string; login: string }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

export const authAPI = {
  auth() {
    return instance
      .get<AuthMeType>(`auth/me`)
      .then((response) => response.data)
  },
  setAuthProfile(id: number) {
    return instance
      .get<profileType>(`profile/${id}`)
      .then((response) => response.data)
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data)
  },
}
type GetCaptchaUrlType = {
  url: string
}
export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlType>(`security/get-captcha-url`)
      .then((response) => response.data)
  },
}
