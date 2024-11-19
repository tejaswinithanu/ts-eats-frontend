import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authentication from '../services/auth.service'

export const logInUser=createAsyncThunk('user/login',async (userDetails:any,{rejectWithValue})=>{
    try{
        const response=await authentication.login(userDetails)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const existUser=createAsyncThunk('user/exist',async (email:any,{rejectWithValue})=>{
    try{
        const response=await authentication.existUser(email)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})



export const registerUser=createAsyncThunk('user/register',async (userDetails:any,{rejectWithValue})=>{
    try{
        const response=await authentication.register(userDetails)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

const authSlice=createSlice({
    name:'authSlice',
    initialState:{
        loginStatus:"idle",
        loggedInUser:{},
        loginError:"",
        mode:'login',
        existUserStatus:'idle',
        existedUser:{},
        existUserError:''
    },
    reducers:{
        changeMode:(state:any,action)=>{
            state.mode=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(logInUser.pending,(state:any)=>{
                state.loginStatus='loading'
            })
            .addCase(logInUser.fulfilled,(state:any,action:any)=>{
                state.loginStatus="succeeded"
                state.loggedInUser=action.payload
            })
            .addCase(logInUser.rejected,(state:any,action:any)=>{
                state.loginStatus='failed'
                state.loginError=action.payload
            })
            .addCase(existUser.pending,(state:any)=>{
                state.existUserStatus='loading'
            })
            .addCase(existUser.fulfilled,(state:any,action:any)=>{
                state.existUserStatus="succeeded"
                state.existedUser=action.payload
            })
            .addCase(existUser.rejected,(state:any,action:any)=>{
                state.existUserStatus='failed'
                state.existUserError=action.payload
            })
    }
})

export const {changeMode}=authSlice.actions

export default authSlice.reducer