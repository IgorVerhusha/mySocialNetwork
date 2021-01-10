import {instance, UsersAPIType} from "./api";


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance
            .get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null? `` : `&friend=${friend}`))
            .then((response) => response.data);
    },

    follow(id: number) {
        return instance.post(`follow/${id}`, {}).then((response) => response.data);
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then((response) => response.data)
    },
};
