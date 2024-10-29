import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import menuSlice from './menuSlice'
import userSlice from './userSlice'

const store=configureStore({
    reducer:{
        authSlice,
        menuSlice,
        userSlice
    }
})

export default store