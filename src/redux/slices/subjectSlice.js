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
        console.log("SubjectData", subjectData)
        const response = await axios.post(`${base_url}/subject/add-subject`,subjectData)
        console.log("RESPONSE", response)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const editSubject = createAsyncThunk("subject/add-subject", async (subjectData, { rejectWithValue }) => {
    try {

        const response = await axios.put(`${base_url}/subject/${subjectData._id}`,subjectData)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const deleteSubject = createAsyncThunk("subject/deleteSubject", async(id,{rejectWithValue})=>{
     try{
        const response = await axios.delete(`${base_url}/subject/${id}`)
        return response.data
     }catch (error) {
        return rejectWithValue(error.response?.data || error.message)
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
        builder.addCase(fetchSubjects.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchSubjects.fulfilled,(state,action)=>{
            state.loading = false
            state.allSubjectsData = action.payload
        })
        builder.addCase(fetchSubjects.rejected,(state, action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const getSubjectData=(state)=>{
    return state.subject.allSubjectsData
}

export const subjectloading =(state)=>{
    return state.subject.loading
}


export default subjectSlice.reducer;