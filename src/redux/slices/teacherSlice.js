import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";

export const getTeachersData = createAsyncThunk(
  "teacher/getTeachersData",
  async (schoolId) => {
    try {
      const response = await axios.get(
        `${base_url}/user/get-users?schoolId=${schoolId}&role=teacher`
      );
      return response.data.users;
    } catch (err) {
      return err;
    }
  }
);

export const registerTeacher = createAsyncThunk(
  "teacher/add-user",
  async (info, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/user/add-user`, info);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const editTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async (teacherDetails, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/user/update-user/${teacherDetails._id}`,  // Assuming you're passing the school ID in `schoolDetails`
        teacherDetails
      );
      return response.data;  // Returning the updated school data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async (teacherId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}/user/delete-user/${teacherId}`); // Assuming you're passing the school ID as a parameter
      return response.data; // Return the response data if needed (e.g., success message)
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message); // Handle errors gracefully
    }
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    loading: false,
    error: false,
    teachersData: [],
  },
  extraReducers: (builder) => {

   // get teachers Data

    builder.addCase(getTeachersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeachersData.fulfilled, (state, action) => {
      // Ensure action.payload is an array of plain objects
      state.loading = false;
      state.teachersData = action.payload; // should be a plain array of objects
    });
    
    builder.addCase(getTeachersData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Ensure you capture the error message
    });
    

    // add new teacher 

    builder.addCase(registerTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.teachersData.push(action.payload);
    });
    builder.addCase(registerTeacher.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
  },
});

export const teachersData = (state) => {
  return state.teacher.teachersData;
};

export const teachersLoading = (state) => {
  return state.teacher.loading;
};


export default teacherSlice.reducer;
