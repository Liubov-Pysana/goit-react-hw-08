import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContacts = createAsyncThunk("contacts/addContacts", async (newContact, thunkAPI) => {
    try {
        const response = await axios.post("/contacts", newContact);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateContact = createAsyncThunk("contacts/update", async ({ id, name, number }, thunkAPI) => {
    try {
        const response = await axios.patch(`/contacts/${id}`, { name, number });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
