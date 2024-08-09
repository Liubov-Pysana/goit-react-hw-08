import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Interceptor to automatically add the token to requests
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Register new user
export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", newUser);
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return response.data;
    } catch (error) {
        // Return the actual error message from the server response
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Log in existing user
export const logIn = createAsyncThunk("auth/logIn", async (creds, thunkAPI) => {
    try {
        const response = await axios.post("/users/login", creds);
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return response.data;
    } catch (error) {
        // Customize error message based on the response
        let message = "An error occurred. Please try again.";
        if (error.response?.status === 400) {
            message = "Fill in the correct password";
        }
        return thunkAPI.rejectWithValue(message);
    }
});

// Log out user
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout");
        localStorage.removeItem("token");
        setAuthHeader("");
    } catch (error) {
        // Return the actual error message from the server response
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Refresh user session
export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token || localStorage.getItem("token");

        if (!token) {
            return thunkAPI.rejectWithValue("No token found");
        }

        setAuthHeader(token);

        try {
            const response = await axios.get("/users/current");
            return response.data;
        } catch (error) {
            // Return the actual error message from the server response
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { auth } = getState();
            return auth.token !== null;
        },
    }
);
