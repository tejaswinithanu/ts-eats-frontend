import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../services/user.store";

export const addCartItem:any=createAsyncThunk('cart/addItem',async (item,{rejectWithValue})=>{
    try{
        const response=await userService.addCartItem(item)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const removeCartItem=createAsyncThunk('cart/removeItem',async (item,{rejectWithValue})=>{
    try{
        const response=await userService.removeCartItem(item)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const getCartItems:any=createAsyncThunk('cart/fetchItems',async (userId,{rejectWithValue})=>{
    try{
        const response=await userService.getCartItems(userId)
        
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        addCartStatus:'idle',
        cartItems:[],
        status:'idle',
        error:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addCartItem.pending,(state:any)=>{
                state.addCartStatus='loading'
            })
            .addCase(addCartItem.fulfilled,(state:any)=>{
                state.addCartStatus='succeeded'
            })
            .addCase(addCartItem.rejected,(state:any)=>{
                state.addCartStatus='failed'
            })
            .addCase(getCartItems.pending,(state:any)=>{
                state.status='loading'
            })
            .addCase(getCartItems.fulfilled,(state:any,action)=>{
                state.status='succeeded'
                state.cartItems=action.payload
            })
            .addCase(getCartItems.rejected,(state:any,action)=>{
                state.status='failed'
                state.error=action.payload
            })
    }
})

export default userSlice.reducer