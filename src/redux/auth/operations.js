import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

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

export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", newUser);
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logIn = createAsyncThunk("auth/logIn", async (creds, thunkAPI) => {
    try {
        const response = await axios.post("/users/login", creds);
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout");
        localStorage.removeItem("token");
        setAuthHeader("");
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

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
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { auth } = getState();
            return auth.token !== null;
        },
    }
);
