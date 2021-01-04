import {instance, UsersAPIType} from "./api";


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance
            .get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data);
    },

    follow(id: number) {
        return instance.post(`follow/${id}`, {}).then((response) => response.data);
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then((response) => response.data)
    },
};
