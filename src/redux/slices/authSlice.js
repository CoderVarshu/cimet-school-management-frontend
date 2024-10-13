import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";
import Cookies from 'js-cookie';


export const loginUser= createAsyncThunk(
    'auth/login',async(values,  { rejectWithValue })=>{
        try{
         const response = await axios.post(`${base_url}/user/user-login`,values)
         const token = response.data.token;
        // Save token in cookies (you can set expiration based on the token's expiry)
        Cookies.set('authToken', token, { expires: 1 });
         return response.data
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || err.message, // Custom error message
                status: err.response?.status || 500 // Status code
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
        // Save token in cookies (you can set expiration based on the token's expiry)
        Cookies.set('authToken', token, { expires: 1 });
        return response.data;
      } catch (err) {
        // Return only the serializable parts of the error
        return rejectWithValue({
          message: err.response?.data?.message || err.message, // Custom error message
          status: err.response?.status || 500 // Status code
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
            Cookies.remove('authToken');
            state.isAuth = false;
            state.authData = [];
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

export default authSlice.reducer