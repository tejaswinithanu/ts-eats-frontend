import { Box } from "@mui/material"
import Navbar from "../components/navbar"
import { Orders } from "../components/orders"

export const MyOrders=()=>{
    return(
        <div>
            <Box sx={{padding:{ xs: '0', lg: '15px 12vw' }}}  >
            <Navbar/>
            </Box>
            <Orders/>
        </div>
    )
}