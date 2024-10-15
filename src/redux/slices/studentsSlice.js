import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

export const registerStudent = createAsyncThunk(
  "student/add-user",
  async (info, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/student/add-student`, info);
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
          `${base_url}/student/get-students?schoolId=${schoolId}`
        );
        console.log("API RESPONSE", response);
        return response.data.users;
      } catch (err) {
        return err;
      }
    }
  );


  export const editStudent = createAsyncThunk(
    "student/updateStudent",
    async (stdDetails, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${base_url}/user/update-user/${stdDetails._id}`,  // Assuming you're passing the school ID in `schoolDetails`
          stdDetails
        );
        return response.data;  // Returning the updated school data
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const deleteStudent = createAsyncThunk(
    "teacher/deleteTeacher",
    async (studentId, { rejectWithValue }) => {
      console.log("IDD", studentId)
      try {
        const response = await axios.delete(`${base_url}/user/delete-user/${studentId}`); // Assuming you're passing the school ID as a parameter
        return response.data; // Return the response data if needed (e.g., success message)
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message); // Handle errors gracefully
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
