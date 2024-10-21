import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";


export const addSubmission=createAsyncThunk("submission/addSubmission", async(payload,{rejectWithValue})=>{
    try{

        const response = await axios.post(`${base_url}/submission/add-sumission`,payload)
        return response.data

    }catch(error){
        return rejectWithValue(error.response.data || error.message )
    }
})


// by assignmentID

export const getSubmissionByAssignmentId =createAsyncThunk("submission/getSubmission", async(assignmentId,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${base_url}/submission/assignment/${assignmentId}`)
        return response.data

    }catch(error){
        return rejectWithValue(error.response.data || error.message )
    }
})

// perticular student Submission

export const getSubmissionByStudentId =createAsyncThunk("submission/getSubmissionByStudentId", async({studentId,assignmentId},{rejectWithValue})=>{
    try{
        const response = await axios.get(`${base_url}/submission/assignment/student/${studentId}/${assignmentId}`)
        return response.data

    }catch(error){
        return rejectWithValue(error.response.data || error.message )
    }
})


export const updateSubmission = createAsyncThunk("submission/updateSubmission", async(submissionDetails,{rejectWithValue})=>{
    try{

        const response = await axios.put(`${base_url}/submission/update-assignment/${submissionDetails?._id}`, submissionDetails)
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message )
    }
})

const submissionSlice = createSlice({
    name:'submission',
    initialState: {
        submissionDataById:[],
        submissionByStudent:[],
        loading: false,
        error: null

    },
    extraReducers:(builder)=>{

        builder.addCase(getSubmissionByAssignmentId.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getSubmissionByAssignmentId.fulfilled,(state,action)=>{
            state.loading= false,
            state.submissionDataById = action.payload
        })
        builder.addCase(getSubmissionByAssignmentId.rejected,(state, action)=>{
            state.loading = false,
            state.error  = action.error.message
        })

        builder.addCase(getSubmissionByStudentId.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getSubmissionByStudentId.fulfilled,(state, action)=>{
            state.loading = false,
            state.submissionByStudent = action.payload
            state.submissionDataById = action.payload
        })
        builder.addCase(getSubmissionByStudentId.rejected,(state, action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }

})


export const submissionByStudent=(state)=>{
    return state.submission.submissionByStudent
}

export const submissiondata=(state)=>{
    return state.submission.submissionDataById
}

export const submissionLoading =(state)=>{
    return state.submission.loading
}

export default submissionSlice.reducer