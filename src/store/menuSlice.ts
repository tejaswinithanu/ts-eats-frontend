import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import menuService from '../services/menu.service'

export const getMenuItems=createAsyncThunk('menu/fetchMenu',async (_,{rejectWithValue})=>{
    try{
        const response=await menuService.getMenuItems()
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const getMenuByCategory:any=createAsyncThunk('menu/fetchMenuByCategory',async (categoryId,{rejectWithValue})=>{
    try{
        const response=await menuService.getMenuByCategory(categoryId)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const getAllCategories=createAsyncThunk('menu/fetchCategories',async (_,{rejectWithValue})=>{
    try{
        const response=await menuService.getAllCategories()
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

const menuSlice=createSlice({
    name:'menuSlice',
    initialState:{
        status:"idle",
        error:"",
        menuItems:[],
        menuItemsByCategory:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getMenuItems.pending,(state:any)=>{
                state.status='loading'
            })
            .addCase(getMenuItems.fulfilled,(state:any,action:any)=>{
                state.status="succeeded"
                state.menuItems=action.payload
            })
            .addCase(getMenuItems.rejected,(state:any,action:any)=>{
                state.status='failed'
                state.error=action.payload
            })
            .addCase(getMenuByCategory.pending,(state:any)=>{
                state.status='loading'
            })
            .addCase(getMenuByCategory.fulfilled,(state:any,action:any)=>{
                state.status="succeeded"
                state.menuItemsByCategory=action.payload
            })
            .addCase(getMenuByCategory.rejected,(state:any,action:any)=>{
                state.status='failed'
                state.error=action.payload
            })
    }
})

export default menuSlice.reducer