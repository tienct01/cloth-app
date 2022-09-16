import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../components/Products";

interface CartStateType {
    products: {
        product: ProductType;
        color: String;
        size: String;
        quantity: number;
    }[];
    cartQuantity: number;
    total: number;
}
interface AddPayloadType {
    product: ProductType;
    productQuantity: number;
    productColor: string;
    productSize: string;
}
export type CartResponse = {
    product: ProductType;
    color: String;
    size: String;
    quantity: number;
};
interface DeletePayloadType {
    productIndex: number;
}
const initialState: CartStateType = {
    products: [],
    cartQuantity: 0,
    total: 0,
}
export const cartSlice = createSlice({
    name: "carts",
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartResponse>) => {
            state.products = [...state.products, action.payload];
            state.cartQuantity += action.payload.quantity;
            state.total += action.payload.quantity * action.payload.product.price;
        },
        removeCart: (state) => {
            state.products = [];
            state.cartQuantity = 0;
            state.total = 0;
        },
        addProduct: (state, action: PayloadAction<AddPayloadType>) => {
            const {product, productSize, productQuantity, productColor} = action.payload;
            let dupProduct = state.products.find((value, index) => {
                let res = value.product._id === product._id
                && value.color === productColor
                && value.size === productSize;
                return res;
            });
            if(dupProduct) {
                dupProduct.quantity += productQuantity;
            }
            else {
                state.products = [...state.products, {
                    product: product,
                    color: productColor,
                    size: productSize,
                    quantity: productQuantity
                }];
            }
            state.cartQuantity += productQuantity;
            state.total += product.price*productQuantity;
        },
        deleteProduct: (state, action: PayloadAction<DeletePayloadType>) => {
            let delProduct = state.products.find((item, index) => index === action.payload.productIndex);
            let newQuantity = state.cartQuantity;
            let newTotal = state.total;
            if(delProduct) {
                newQuantity = state.cartQuantity - delProduct.quantity;
                newTotal = state.total - delProduct.quantity*delProduct.product.price;
            }
            return {
                products: [...state.products].filter((item, index) => index !== action.payload.productIndex),
                cartQuantity: newQuantity,
                total: newTotal
            }
        },
        incQuantity: (state, action: PayloadAction<DeletePayloadType>) => {
            let product = state.products.find((item, index) => index === action.payload.productIndex);
            if(product) {
                product.quantity += 1;
                state.cartQuantity +=1;
                state.total += product.product.price;
            }
        },
        decQuantity: (state, action: PayloadAction<DeletePayloadType>) => {
            let product = state.products.find((item, index) => index === action.payload.productIndex);
            if(product) {
                product.quantity -= 1;
                state.cartQuantity -=1;
                state.total -= product.product.price;
            }
        }
    }
});

export const {setCart,removeCart, addProduct, deleteProduct, incQuantity, decQuantity} = cartSlice.actions;

export default cartSlice.reducer;