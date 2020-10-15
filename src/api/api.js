import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "a7708531-0e49-48f3-ad2c-d33a80bebb3f",
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(id) {
    return instance.post(`follow/${id}`, {}).then((response) => response.data);
  },

  unfollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data);
  },
  getStatus(id) {
    return instance
      .get(`profile/status/${id}`)
      .then((response) => response.data);
  },
  updateStatus(status) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => response.data);
  },
  savePhoto(photo) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveProfile(formData) {
    return instance
      .put(`profile`, formData)
      .then((response) => response.data);
  },
};

export const authAPI = {
  auth() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  setAuthProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`).then((response) => response.data);
  }
}