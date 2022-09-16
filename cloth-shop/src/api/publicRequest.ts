import axios from "axios";

const baseURL = "http://localhost:4000";
export const publicRequest = axios.create({
    baseURL: baseURL
});
export const authRequest = (token: string) => {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "x-access-token": token
        }
    });
}