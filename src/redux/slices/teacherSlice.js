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
      console.log("API RESPONSE", response);
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
      (state.loading = false), (state.teachersData = action.payload);
    });
    builder.addCase(getTeachersData.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
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
