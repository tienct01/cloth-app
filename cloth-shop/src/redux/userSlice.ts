import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../api/storage";

export interface UserType {
    userId: string;
    username: boolean;
    email: boolean;
    accessToken: string;
}
const createInitState = () => {
    const user = getCurrentUser();
    if(user) {
        return {
            currentUser: user,
            isLoading: false,
            error: {
                login: "",
                register: ""
            }
        }
    }
    return {
        currentUser: null,
        isLoading: false,
        error: {
            login: "",
            register: ""
        }
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState: createInitState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginFulfilled: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.error = { login: "", register: ""}
        },
        loginRejected: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error.login = action.payload
        },
        logoutFullfilled: (state) => {
            state.currentUser = null;
        },
        registerRejected: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error.register = action.payload;
        }
    },
});
export const { loginPending, loginFulfilled, loginRejected, logoutFullfilled, registerRejected } = userSlice.actions;
export default userSlice.reducer;