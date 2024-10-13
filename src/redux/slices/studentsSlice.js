import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

export const registerStudent = createAsyncThunk(
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

export const getStudentsData = createAsyncThunk(
    "students/getStudentData",
    async (schoolId) => {
      try {
        const response = await axios.get(
          `${base_url}/user/get-users?schoolId=${schoolId}&role=student`
        );
        console.log("API RESPONSE", response);
        return response.data.users;
      } catch (err) {
        return err;
      }
    }
  );

const studentsSlice = createSlice({
  name: "student",
  initialState: {
    loading: false,
    error: null,
    studentsData: [],
  },

  extraReducers: (builder) => {

    builder.addCase(getStudentsData.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getStudentsData.fulfilled, (state, action) => {
        (state.loading = false), (state.studentsData = action.payload);
      });
      builder.addCase(getStudentsData.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });

      
    builder.addCase(registerStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.studentsData.push(action.payload);
    });
    builder.addCase(registerStudent.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
  },
});

export const studentsData = (state) => {
  return state.student.studentsData;
};

export const studenstLoading = (state) => {
  return state.student.loading;
};

export default studentsSlice.reducer;
