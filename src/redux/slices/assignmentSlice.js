import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";


// get Assignment By Class

export const getAssignment = createAsyncThunk("assignment/getAssignment", async (classId, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${base_url}/assignment/${classId}`
        );
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

// get Assignment By School

export const getAssignmentBySchool = createAsyncThunk("assignment/getAssignmentBySchool", async (schoolId, { rejectWithValue }) => {
    try {

        const response = await axios.get(
            `${base_url}/assignment/school/${schoolId}`

        );
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})



export const addAssignment = createAsyncThunk("assignment/newAssignment", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${base_url}/assignment/add-assignment`, data);
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const editAssignment = createAsyncThunk("assignment/editAssignment", async (assignmentDetils, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${base_url}/assignment/${assignmentDetils._id}`, assignmentDetils)
        console.log("RESPPP", response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data || error.message)
    }
})

export const deleteAssignment = createAsyncThunk("assignment/deleteAssignment", async (id, { rejectWithValue }) => {
    try {

        const response = await axios.delete(`${base_url}/assignment/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data || error.message)
    }
})

const assignmentSlice = createSlice({
    name: "assignments",
    initialState: {
        assignmentsData: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {

        builder.addCase(getAssignment.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAssignment.fulfilled, (state, action) => {
            state.loading = false,
                state.assignmentsData = action.payload
        })
        builder.addCase(getAssignment.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        })

        builder.addCase(getAssignmentBySchool.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAssignmentBySchool.fulfilled, (state, action) => {
            state.loading = false,
                state.assignmentsData = action.payload
        })
        builder.addCase(getAssignmentBySchool.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        })

    }
})


export const assignmentsLoading = (state) => {
    return state.assignments.loading
}

export const assignmentsData = (state) => {
    return state.assignments.assignmentsData
}

export default assignmentSlice.reducer;