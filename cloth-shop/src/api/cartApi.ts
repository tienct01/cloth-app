import { authRequest, publicRequest } from "./publicRequest";
import { ProductType } from "../components/Products";
import { getToken } from "./storage";
export type CartData = {
    userId : string;
    products: {
        productId: string;
        color: String;
        size: String;
        quantity: number;
    }[];
}
export const cartApi = {
    create(data: CartData) {
        return authRequest(getToken()).post<CartData>("/carts/add", data);
    },
    get(id: string) {
        return authRequest(getToken()).get<CartData>(`/carts/${id}`);
    },
    update(id: string, data: CartData) {
        return authRequest(getToken()).patch<CartData>(`/carts/update/${id}`, data);
    }
}