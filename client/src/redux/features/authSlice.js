import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.signIn(formValue);
            toast.success("Login Successfull");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.signUp(formValue);
            toast.success("Register Successfull");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async ({ result, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.googleSignIn(result);
            toast.success("Google Sign-in Successfull");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem("profile");
            state.user = null;
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = "";
            state.user = null;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action.payload })
            );
            state.user = action.payload;
            state.error = "";
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = "";
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action.payload })
            );
            state.user = action.payload;
            state.error = "";
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.user = null;
        },
        [googleSignIn.pending]: (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = "";
        },
        [googleSignIn.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action.payload })
            );
            state.user = action.payload;
            state.error = "";
        },
        [googleSignIn.rejected]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.error = action.payload.message;

            state.user = null;
        },
    },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
