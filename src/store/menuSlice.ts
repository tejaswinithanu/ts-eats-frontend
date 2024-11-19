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

export const deleteMenuItem:any=createAsyncThunk('menu/deleteItem',async (itemId,{rejectWithValue})=>{
    try{
        const response=await menuService.deleteMenuItem(itemId)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const updateMenuItem:any=createAsyncThunk('menu/updateItem',async (item:any,{rejectWithValue})=>{
    const {itemDetails,itemId}=item
    try{
        const response=await menuService.updateMenuItem({...itemDetails},itemId)
        return response
    }catch(err:any){                            
            return rejectWithValue(err.message)
    }
})

export const addMenuItem:any=createAsyncThunk('menu/addItem',async (item,{rejectWithValue})=>{
    try{
        const response=await menuService.addMenuItem(item)
        return response
    }catch(err:any){
        return rejectWithValue(err.message)
    }
})

export const addCategory:any=createAsyncThunk('menu/addCategory',async (category,{rejectWithValue})=>{
    try{
        const response=await menuService.addCategory(category)
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
        menuItemsByCategory:[],
        categories:[],
        activeCategory:null,
        deleteItemStatus:'idle',
        addItemStatus:'idle',
        onlyVeg:false,
        menuByCategoryStatus:'idle',
        getCategoriesStatus:'idle',
        searchValue:''
    },
    reducers:{
        setActiveCategory:(state:any,action)=>{
            state.activeCategory=action.payload
        },
        toggleVeg:(state:any)=>{
            state.onlyVeg=!state.onlyVeg
        },
        updateSearchValue:(state:any,action)=>{
            state.searchValue=action.payload
        }
    },
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
                state.menuByCategoryStatus='loading'
            })
            .addCase(getMenuByCategory.fulfilled,(state:any,action:any)=>{
                state.menuByCategoryStatus="succeeded"
                state.menuItemsByCategory=action.payload
            })
            .addCase(getMenuByCategory.rejected,(state:any,action:any)=>{   
                state.menuByCategoryStatus='failed'
                state.error=action.payload
            })
            .addCase(getAllCategories.pending,(state:any)=>{
                state.getCategoriesStatus='loading'
            })
            .addCase(getAllCategories.fulfilled,(state:any,action:any)=>{
                state.getCategoriesStatus="succeeded"
                state.categories=action.payload
                if(action.payload.length!==0){
                    state.activeCategory=action.payload[0].category
                }
            })
            .addCase(getAllCategories.rejected,(state:any,action:any)=>{
                state.getCategoriesStatus='failed'
                state.error=action.payload
            })
            .addCase(deleteMenuItem.pending,(state:any)=>{
                state.deleteItemStatus='loading'
            })
            .addCase(deleteMenuItem.fulfilled,(state:any)=>{
                state.deleteItemStatus="succeeded"
            })
            .addCase(deleteMenuItem.rejected,(state:any,action:any)=>{
                state.deleteItemStatus='failed'
                state.error=action.payload
            })
            .addCase(addMenuItem.pending,(state:any)=>{
                state.addItemStatus='loading'
            })
            .addCase(addMenuItem.fulfilled,(state:any)=>{
                state.addItemStatus="succeeded"
            })
            .addCase(addMenuItem.rejected,(state:any,action:any)=>{
                state.addItemStatus='failed'
                state.error=action.payload
            })
    }
})

export const {setActiveCategory, toggleVeg, updateSearchValue}=menuSlice.actions

export default menuSlice.reducer