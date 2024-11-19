import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../services/user.service";

export const addCartItem:any=createAsyncThunk('cart/addItem',async (item,{rejectWithValue})=>{
    try{
        const response=await userService.addCartItem(item)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const updateOrder:any=createAsyncThunk('user/updateOrder',async (params:any,{rejectWithValue})=>{
    const {orderId,status}=params
    try{
        const response=await userService.updateOrder(orderId, status)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const placeOrder:any=createAsyncThunk('user/placeOrder',async (userId,{rejectWithValue})=>{
    try{
        const response=await userService.placeOrder(userId)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const getOrderHistory:any=createAsyncThunk('user/getOrders',async (userId,{rejectWithValue})=>{
    try{
        const response=await userService.getOrderHistory(userId)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})


export const addAddress:any=createAsyncThunk('user/addAddress',async (userAddress,{rejectWithValue})=>{
    try{
        const response=await userService.addAddress(userAddress)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const getUserAddress:any=createAsyncThunk('user/getAddresses',async (userId,{rejectWithValue})=>{
    try{
        const response=await userService.getAddresses(userId)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const updateQuantity:any=createAsyncThunk('cart/updateQuantity',async (item,{rejectWithValue})=>{

    try{
        const response=await userService.updateQuantity(item)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const removeCartItem:any=createAsyncThunk('cart/removeItem',async (item,{rejectWithValue})=>{
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
        cartData:{cartItems:[],totalCartAmount:0},
        status:'idle',
        error:"",
        updateCartStatus:'idle',
        removeCartStatus:'idle',
        userAddresses:[],
        getAddressStatus:'idle',
        addAddressStatus:'idle',
        placeOrderStatus:'idle',
        orderHistory:[],
        orderHistoryStatus:'idle',
        orderUpdateStatus:'idle',
        getCartStatus:'idle',
        getCartError:'idle'
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
                state.getCartStatus='loading'
                state.getCartError=''
            })
            .addCase(getCartItems.fulfilled,(state:any,action)=>{
                state.getCartStatus='succeeded'
                state.cartData=action.payload
            })
            .addCase(getCartItems.rejected,(state:any,action)=>{
                state.getCartStatus='failed'
                state.getCartError=action.payload
            })
            .addCase(updateQuantity.pending,(state:any)=>{
                state.updateCartStatus='loading'
            })
            .addCase(updateQuantity.fulfilled,(state:any)=>{
                state.updateCartStatus='succeeded'
            })
            .addCase(updateQuantity.rejected,(state:any)=>{
                state.updateCartStatus='failed'
            })
            .addCase(removeCartItem.pending,(state:any)=>{
                state.removeCartItem='loading'
            })
            .addCase(removeCartItem.fulfilled,(state:any)=>{
                state.removeCartStatus='succeeded'
            })
            .addCase(removeCartItem.rejected,(state:any)=>{
                state.removeCartStatus='failed'
            })
            .addCase(getUserAddress.pending,(state:any)=>{
                state.getAddressStatus='loading'
            })
            .addCase(getUserAddress.fulfilled,(state:any, action)=>{
                state.getAddressStatus='succeeded'
                state.userAddresses=action.payload
            })
            .addCase(getUserAddress.rejected,(state:any)=>{
                state.getAddressStatus='failed'
            })
            .addCase(addAddress.pending,(state:any)=>{
                state.addAddressStatus='loading'
            })
            .addCase(addAddress.fulfilled,(state:any)=>{
                state.addAddressStatus='succeeded'
            })
            .addCase(addAddress.rejected,(state:any)=>{
                state.addAddressStatus='failed'
            })
            .addCase(placeOrder.pending,(state:any)=>{
                state.placeOrderStatus='loading'
            })
            .addCase(placeOrder.fulfilled,(state:any)=>{
                state.placeOrderStatus='succeeded'
            })
            .addCase(placeOrder.rejected,(state:any)=>{
                state.placeOrderStatus='failed'
            })
            .addCase(getOrderHistory.pending,(state:any)=>{
                state.orderHistoryStatus='loading'
            })
            .addCase(getOrderHistory.fulfilled,(state:any, action)=>{
                state.orderHistoryStatus='succeeded'
                state.orderHistory=action.payload
            })
            .addCase(getOrderHistory.rejected,(state:any)=>{
                state.orderHistoryStatus='failed'
            })
            .addCase(updateOrder.pending,(state:any)=>{
                state.orderUpdateStatus='loading'
            })
            .addCase(updateOrder.fulfilled,(state:any)=>{
                state.orderUpdateStatus='succeeded'
            })
            .addCase(updateOrder.rejected,(state:any)=>{
                state.orderUpdateStatus='failed'
            })
    }
})

export default userSlice.reducer