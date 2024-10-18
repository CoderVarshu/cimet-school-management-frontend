import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";

// teacher for perticular school

export const getTeachersData = createAsyncThunk(
  "teacher/getTeachersData",
  async (schoolId) => {
    try {
      const response = await axios.get(
        `${base_url}/teacher/get-teacher/${schoolId}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);


// get teachers for perticular class 

export const getClassTeachersData = createAsyncThunk(
  "teacher/getTeachersData",
  async (schoolId, classId) => {
    try {
      const response = await axios.get(
        `${base_url}/teacher/${schoolId}/${classId}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);



export const registerTeacher = createAsyncThunk(
  "teacher/add-user",
  async (info, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/teacher/add-teacher/${info.schoolId}`, info);
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
        `${base_url}/teacher/update-teacher/${teacherDetails._id}`,  // Assuming you're passing the school ID in `schoolDetails`
        teacherDetails
      );
      console.log("APII", response)
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
      const response = await axios.delete(`${base_url}/teacher/delete-teacher/${teacherId}`); // Assuming you're passing the school ID as a parameter
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
      state.loading = false;
      state.teachersData = action.payload;
    });
    
    builder.addCase(getTeachersData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    

    // get perticular class teacher 

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
