import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";



export const registerSchool = createAsyncThunk(
  "school/addSchool",
  async (info, {rejectWithValue}) => {
    try {
        const response = await axios.post(
          `${base_url}/api/add-school`, info);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
  }
);

export const getSchool= createAsyncThunk(
    "school/getSchool", async()=>{
        try{
            const response = await axios.get(base_url+'/api/schools')
            return response.data
        }catch(err){
            return err.message 
        }
    }
)

export const editSchool = createAsyncThunk(
    "school/updateSchool",
    async (schoolDetails, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${base_url}/api/update-school/${schoolDetails._id}`,  // Assuming you're passing the school ID in `schoolDetails`
          schoolDetails
        );
        return response.data;  // Returning the updated school data
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const deleteSchool = createAsyncThunk(
    "school/deleteSchool",
    async (schoolId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${base_url}/api/delete-school/${schoolId}`); // Assuming you're passing the school ID as a parameter
        return response.data; // Return the response data if needed (e.g., success message)
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message); // Handle errors gracefully
      }
    }
  );

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    loading: false,
    error: null,
    schoolData: [],
    selectedSchool: null,
    singleSchoolData: null,
  },
  extraReducers: (builder) => {

    // to add school 

    builder.addCase(registerSchool.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerSchool.fulfilled, (state, action) => {
      state.loading = false;
      state.schoolData.push(action.payload);
    });
    builder.addCase(registerSchool.rejected, (state, action) => {
      (state.loading = false), 
      (state.error = action.error.message);
    });

    // to get all school data

    builder.addCase(getSchool.pending,(state)=>{
        state.loading = true
    })
    builder.addCase(getSchool.fulfilled, (state,action)=>{
        state.loading = false
        state.schoolData = action.payload
    })
    builder.addCase(getSchool.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
    })

    // to edit perticular school

    builder.addCase(editSchool.pending, (state)=>{
        state.loading = true
    })

    builder.addCase(editSchool.fulfilled, (state, action)=>{
        state.loading = false
        const index = state.schoolData.findIndex(school => school._id === action.payload._id);
        if (index !== -1) {
            state.schoolData[index] = action.payload; 
        }
    })
    builder.addCase(editSchool.rejected, (state, action)=>{
        state.loading = false
        state.error =  action.error.message
    })

    // to delete school

    .addCase(deleteSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolData = state.schoolData.filter(school => school._id !== action.payload._id);
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message;
      });
  },
});


export const allSchoolData =(state)=>{
    return state.school.schoolData
}

export const schoolLoading =(state)=>{
    return state.school.loading
}

export const selectSchoolById = (state, id) => {
  return state.school.schoolData.find((school) => school._id === id) || null; // Adjust the key if needed
};

export default schoolSlice.reducer