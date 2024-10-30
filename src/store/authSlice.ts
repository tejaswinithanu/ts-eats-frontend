import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authentication from '../services/auth.service'

export const logInUser=createAsyncThunk('user/login',async (userDetails:any,{rejectWithValue})=>{
    try{
        const response=await authentication.login(userDetails)
        console.log(response)
        return response
    }catch(err:any){
        console.log(err.message)
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
        mode:'login'
    },
    reducers:{
        changeMode:(state:any,action)=>{
            state.mode=action.payload
            console.log(state.mode)
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(logInUser.pending,(state:any)=>{
                state.loginStatus='loading'
                console.log('status inside pending',state.loginStatus)
            })
            .addCase(logInUser.fulfilled,(state:any,action:any)=>{
                state.loginStatus="succeeded"
                state.loggedInUser=action.payload
                console.log('status inside fulfilled',state.loginStatus)
            })
            .addCase(logInUser.rejected,(state:any,action:any)=>{
                state.loginStatus='failed'
                state.loginError=action.payload
                console.log('status inside rejected',state.loginStatus)
            })
    }
})

export const {changeMode}=authSlice.actions

export default authSlice.reducer