import {photosType, profileType} from "../Redux/types/types";
import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type SavePhotoResponseData ={photos: photosType }

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
            .put<APIResponseType>(`profile/status`, {status: status})
            .then((response) => response.data)
    },
    savePhoto(photo: any) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance
            .put<APIResponseType<SavePhotoResponseData>>(`profile/photo`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then((response) => response.data)
    },
    saveProfile(formData: profileType) {
        return instance.put<APIResponseType>(`profile`, formData).then((response) => response.data)
    },
}