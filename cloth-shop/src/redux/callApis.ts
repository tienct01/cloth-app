import axios from "axios";
import { cartApi, CartData } from "../api/cartApi";
import { publicRequest } from "../api/publicRequest";
import StorageKeys from "../api/storage-keys";
import userApi, { LoginData, RegisterData } from "../api/userApi";
import { ProductType } from "../components/Products";
import { CartResponse, setCart } from "./cartSlice";
import { AppDispatch } from "./store";
import { loginFulfilled, loginPending, loginRejected, logoutFullfilled, registerRejected } from "./userSlice";

export const login = async (dispatch: AppDispatch,data: LoginData) => {
    try {
        dispatch(loginPending());
        const response = await userApi.login(data);
        localStorage.setItem(StorageKeys.access, response.data.accessToken);
        localStorage.setItem(StorageKeys.user, JSON.stringify(response.data));
        dispatch(loginFulfilled(response.data));
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            const message = (err.response.data as { message: string }).message;
            message ? dispatch(loginRejected(message)) : dispatch(loginRejected(""));
        }
    }
}
export const logout = async (dispatch: AppDispatch) => {
    localStorage.removeItem(StorageKeys.access);
    localStorage.removeItem(StorageKeys.user);
    dispatch(logoutFullfilled());
}
export const register = async (dispatch: AppDispatch, dataUser: RegisterData) => {
    try {
        dispatch(loginPending());
        const response = await userApi.register(dataUser);
        localStorage.setItem(StorageKeys.access, response.data.accessToken);
        localStorage.setItem(StorageKeys.user, JSON.stringify(response.data));
        dispatch(loginFulfilled(response.data));
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            const message = (err.response.data as { message: string }).message;
            message ? dispatch(registerRejected(message)) : dispatch(registerRejected(""));
        }
    }
}
export const createCart = async(dispatch: AppDispatch, data: CartData) => {
    try {
        cartApi.create(data);   
    } catch (error) {
        console.log(error);
    }
}
export const getCart = async(dispatch: AppDispatch, id: string) => {
    try {
        let response = await cartApi.get(id);
        response.data.products.forEach(async (item) => {
            let product = await publicRequest.get<ProductType>(`/products/${item.productId}`);
            dispatch(setCart({
                product: product.data,
                color: item.color,
                size: item.size,
                quantity: item.quantity
            }))
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateCart = async(id: string, products: CartResponse[]) => {
    try {
        let dataToUpdate: CartData = {
            userId: id,
            products: products.map((item) => {
                return {
                    productId: item.product._id,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                };
            }),
        };
        cartApi.update(id, dataToUpdate);
    } catch (error) {
        console.log(error);
        
    }
}