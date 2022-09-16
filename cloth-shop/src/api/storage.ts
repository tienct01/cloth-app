import { UserType } from "../redux/userSlice";
import StorageKeys from "./storage-keys"

export const getToken = () => {
    const token = localStorage.getItem((StorageKeys.access));
    if(!token) return "";
    return token;
}
export const getCurrentUser = (): UserType | null => {
    const dataString = localStorage.getItem(StorageKeys.user);
    if(dataString) {
        const user = JSON.parse(dataString);
        if(user){
            return user;
        }
    }
    return null;
}
export const getCart = () => {
    
}