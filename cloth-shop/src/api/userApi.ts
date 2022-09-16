import { publicRequest, authRequest } from "./publicRequest";
import { UserType } from "../redux/userSlice";
export type RegisterData = {
    username: string,
    email: string,
    password: string;
}
export type LoginData = {
    username: string;
    password: string;
}
const userApi = {
    register(data: RegisterData) {
        const url = '/auth/register';
        return publicRequest.post<UserType>(url, data);
    },
    login(data: LoginData){
        const url = '/auth/login';
        return publicRequest.post<UserType>(url, data);
    },
    profile(access_token: string) {
        const url ="/profile";
        return publicRequest.post(url, access_token);
    }
    // async getUser(params) {
    //     const newParams = { ...params }
    //     const accessToken = localStorage.getItem(StorageKeys.access)
    //     const url = `users/`;
    //     const response = await axiosClient.get(url, {
    //         params: { ...newParams },
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     });
    //     return response
    // },
    // async getProfile(params) {
    //     const newParams = { ...params }
    //     const accessToken = localStorage.getItem(StorageKeys.access)
    //     const response = await axiosClient.get(`/detail/`, {
    //         params: { ...newParams },
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //     return response
    // },
}

export default userApi;