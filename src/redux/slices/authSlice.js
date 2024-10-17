import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";
import Cookies from 'js-cookie';


export const loginUser= createAsyncThunk(
    'auth/userlogin',async(values,  { rejectWithValue })=>{
        try{
         const response = await axios.post(`${base_url}/student/student-login`,values)
         const token = response.data.token;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('role', JSON.stringify(response.data.userData?.role))
        localStorage.setItem('data', JSON.stringify(response.data?.userData))
         return response.data
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || err.message,
                status: err.response?.status || 500
              });
        }
    }
)
export const loginTeacher= createAsyncThunk(
  'auth/teacherlogin',async(values,  { rejectWithValue })=>{
      try{
       const response = await axios.post(`${base_url}/teacher/teacher-login`,values)
       const token = response.data.token;
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('role', JSON.stringify(response.data.userData?.role))
      localStorage.setItem('data', JSON.stringify(response.data.userData))
       return response.data
      }catch(err){
          return rejectWithValue({
              message: err.response?.data?.message || err.message,
              status: err.response?.status || 500
            });
      }
  }
)

export const adminLogIn = createAsyncThunk(
    'auth/admin', 
    async (values, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${base_url}/auth/login`,values);
        const token = response.data.token;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('role', JSON.stringify(response.data.userData.role))
        return response.data;
      } catch (err) {
        return rejectWithValue({
          message: err.response?.data?.message || err.message,
          status: err.response?.status || 500
        });
      }
    }
  );
  

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading: false,
        authData:[],
        error : null,
        userData :[]
    },
    reducers: {
        logoutUser: (state) => {
            Cookies.remove('token');
            localStorage.removeItem('data')
            localStorage.removeItem('role')
            localStorage.removeItem('school_id')
            state.authData = [];
          },
    },
    extraReducers:(builder)=>{
       builder.addCase(loginUser.pending, (state)=>{
        state.loading = true
       })
       builder.addCase(loginUser.fulfilled, (state, action)=>{
        state.loading = false
        state.userData = action.payload
       })
       builder.addCase(loginUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
       }) 

       builder.addCase(loginTeacher.pending, (state)=>{
        state.loading = true
       })
       builder.addCase(loginTeacher.fulfilled, (state, action)=>{
        state.loading = false
        state.userData = action.payload
       })
       builder.addCase(loginTeacher.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
       }) 

       builder.addCase(adminLogIn.pending, (state)=>{
        state.loading = true
       })
       builder.addCase(adminLogIn.fulfilled, (state, action)=>{
        state.loading = false
        state.userData.push(action.payload)
       })
       builder.addCase(adminLogIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
    });
    }
})

export const { logoutUser } = authSlice.actions;


export const loginLoading=(state)=>{
    return state.auth.loading
}

export const userData =(state)=>{
    return state.auth.userData
}

export const logOut =(state)=>{
  return state.auth.logOut
}


export default authSlice.reducer