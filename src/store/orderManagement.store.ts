import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderManagementService from "../services/orderManagement.service";


export const getAllOrders=createAsyncThunk('users/addUser',async (_,{rejectWithValue})=>{
    try{
        const response=await orderManagementService.getAllOrders()
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})


const orderManagementSlice=createSlice({
    name:'userManagementSlice',
    initialState:{
        orders:[],
        getOrdersStatus:'idle',
        getOrdersError:'',
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllOrders.pending, (state:any)=>{
                state.getUsersStatus='loading'
            })
            .addCase(getAllOrders.fulfilled, (state:any, action)=>{
                state.getUsersStatus='succeeded'
                state.orders=action.payload
            })
            .addCase(getAllOrders.rejected, (state:any,action)=>{
                state.getUsersStatus='failed'
                state.getUsersError=action.payload
            })
    }
})

export default orderManagementSlice.reducer