import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";
import Cookies from 'js-cookie';


export const registerSchool = createAsyncThunk(
  "school/addSchool",
  async (info, {rejectWithValue}) => {
    try {
      const token = Cookies.get('token'); 
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
        const response = await axios.post(
          `${base_url}/api/add-school`, info, config);
          console.log("RES", response)
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

// get school By Id

export const getSchoolById = createAsyncThunk(
  "school/getById", async(id)=>{
    try{

      const response = await axios.get(`${base_url}/api/schools/${id}`)
      return response.data

    }catch(error){
      return error.message
    }
  }
)

// update school

export const editSchool = createAsyncThunk(
    "school/updateSchool",
    async (schoolDetails, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${base_url}/api/update-school/${schoolDetails._id}`, 
          schoolDetails
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const deleteSchool = createAsyncThunk(
    "school/deleteSchool",
    async (schoolId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${base_url}/api/delete-school/${schoolId}`); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message); 
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
      state.schoolData =[...state.schoolData, action.payload];
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


    // get single school data

    .addCase(getSchoolById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSchoolData = action.payload;
      })
      .addCase(getSchoolById.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message;
      });
  },
});


export const allSchoolData =(state)=>{
    return state.school?.schoolData
}

export const schoolLoading =(state)=>{
    return state.school?.loading
}

export const selectSchoolById = (state) => {
  return state?.school?.singleSchoolData;
};

export default schoolSlice.reducer