import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";
import Cookies from 'js-cookie';


export const loginUser= createAsyncThunk(
    'auth/login',async(values,  { rejectWithValue })=>{
        try{
         const response = await axios.post(`${base_url}/user/user-login`,values)
         const token = response.data.token;
        Cookies.set('userAuthToken', token, { expires: 1 });
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
        console.log("VALUES APII", response)
        const token = response.data.token;
        Cookies.set('adminAuthToken', token, { expires: 1 });
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
        isAdminAuth: false,
        isAuth:false,
        loading: false,
        authData:[],
        error : null,
        userData :[]
    },
    reducers: {
        logoutUser: (state) => {
            Cookies.remove('adminAuthToken');
            state.isAuth = false;
            state.authData = [];
            state.isAdminAuth = false;
          },
    },
    extraReducers:(builder)=>{
       builder.addCase(loginUser.pending, (state)=>{
        state.loading = true
       })
       builder.addCase(loginUser.fulfilled, (state, action)=>{
        state.loading = false
        state.userData.push(action.payload)
        state.isAuth = true
       })
       builder.addCase(loginUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
       }) 

       builder.addCase(adminLogIn.pending, (state)=>{
        state.loading = true
       })
       builder.addCase(adminLogIn.fulfilled, (state, action)=>{
        state.loading = false
        state.authData.push(action.payload)
        state.isAdminAuth = true
        // state.isAuth = true
       })
       builder.addCase(adminLogIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
        state.isAuth = false
    });
    }
})

export const { logoutUser } = authSlice.actions;

export const login = (state)=>{
    return state.auth.authData
}

export const loginLoading=(state)=>{
    return state.auth.loading
}

export const isAuth = (state)=>{
    return state.auth.isAuth
}

export const userData =(state)=>{
    return state.auth.userData
}

export const logOut =(state)=>{
  return state.auth.logOut
}

export const isAdminAuth=(state)=>{
  return state.auth.isAdminAuth
}

export default authSlice.reducer