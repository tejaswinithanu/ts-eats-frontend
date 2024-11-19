import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import menuSlice from './menuSlice'
import userSlice from './userSlice'
import userManagementSlice from './userManagement.store'
import orderManagementSlice from './orderManagement.store'
import adminSlice from './adminSlice'

const store=configureStore({
    reducer:{
        authSlice,
        menuSlice,
        userSlice,
        adminSlice,
        userManagementSlice,
        orderManagementSlice
    }
})

export default store