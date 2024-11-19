import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userManagementService from "../services/userManagement.service";

export const getAllUsers=createAsyncThunk('users/getUsers',async (_,{rejectWithValue})=>{
    try{
        const response=await userManagementService.getAllUsers()
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const addUser:any=createAsyncThunk('users/addUser',async (userDetails,{rejectWithValue})=>{
    try{
        const response=await userManagementService.addUser(userDetails)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})


const userManagementSlice=createSlice({
    name:'userManagementSlice',
    initialState:{
        users:[],
        getUsersStatus:'idle',
        getUsersError:'',
        addUserStatus:'idle',
        searchUserValue:''
    },
    reducers:{
        updateSearchUserValue:(state,action)=>{
            state.searchUserValue=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllUsers.pending, (state:any)=>{
                state.getUsersStatus='loading'
            })
            .addCase(getAllUsers.fulfilled, (state:any, action)=>{
                state.getUsersStatus='succeeded'
                state.users=action.payload
            })
            .addCase(getAllUsers.rejected, (state:any,action)=>{
                state.getUsersStatus='failed'
                state.getUsersError=action.payload
            })
    }
})

export const {updateSearchUserValue}=userManagementSlice.actions

export default userManagementSlice.reducer