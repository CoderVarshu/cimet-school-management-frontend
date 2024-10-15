import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";

export const fetchClasses = createAsyncThunk("class/getClass", async (schoolId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${base_url}/class/${schoolId}`)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const newClass = createAsyncThunk("class/addClass",async(classDetails,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${base_url}/class/add-class/${classDetails.schoolId}`, classDetails)
        console.log("RESPPP", response)
         return response.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
})

export const editClass = createAsyncThunk("class/editClass",async(classDetails,{rejectWithValue})=>{
    try{
        const response = await axios.put(`${base_url}/class/${classDetails._id}`, classDetails)
        console.log("RESPPP", response)
         return response.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
})

export const deleteClass = createAsyncThunk("class/deleteClass", async(id,{rejectWithValue})=>{
    try{

        const response = await axios.delete(`${base_url}/class/${id}`)
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
})

const classSlice = createSlice({
    name: "class",
    initialState: {
        loading: false,
        error: false,
        classesData: [],

    },
    extraReducers: (builder) => {
        builder.addCase(fetchClasses.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(fetchClasses.fulfilled,(state, action)=>{
            state.loading = false,
            state.classesData = action.payload
        })
        builder.addCase(fetchClasses.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

    }
})

export const getClassesData=(state)=>{
    return state.class.classesData
}

export const classesLoading=(state)=>{
    return state.class.loading
}

export default classSlice.reducer