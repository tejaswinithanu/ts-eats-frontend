import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import { CategoryBar } from "../../components/CategoryBar/categoryBar";
import { useDispatch, useSelector } from "react-redux";
import { getMenuByCategory } from "../../store/menuSlice";
import { MenuItemCard } from "../../components/MenuItemCard/menuItemCard";
import SlideUpFooter from "../../components/SlideUpFooter/SlideUpFooter";

const Menu=()=>{
    const menuItems=useSelector((state:any)=>state.menuSlice.menuItemsByCategory)
    const {cartItems}=useSelector((state:any)=>state.userSlice)
    
    const dispatch=useDispatch()

    // useEffect(()=>{
    //     dispatch<any>(getMenuByCategory('starters'))
    // },[])
    
    return(
        <Box>
            <Box sx={{paddingTop:"15px", paddingBottom:"15px"}}>
                <Navbar/>
            </Box>
            <CategoryBar/>
            <Grid sx={{ padding: { xs: '1rem', md: '2rem' } }} container spacing={3}>
                {menuItems.map((item:any) => (
                    <MenuItemCard cartItems={cartItems} key={item.itemId} item={item}/>
                ))}
            </Grid>
            <SlideUpFooter/>
        </Box>
    )
}

export default Menu