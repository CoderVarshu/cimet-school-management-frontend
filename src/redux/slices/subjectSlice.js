import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";

export const fetchSubjects = createAsyncThunk(
    "subject/fetchSubject", async (schoolId, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${base_url}/subject/school/${schoolId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const addSubject = createAsyncThunk("subject/add-subject", async (subjectData, { rejectWithValue }) => {
    try {



    } catch (error) {

    }
})

const subjectSlice = createSlice({
    name: 'subject',
    initialState: {
        loading: false,
        error: false,
        allSubjectsData: []
    },
    extraReducers: (builder) => {
        builder.addCase()
    }
})

export default subjectSlice.reducer;