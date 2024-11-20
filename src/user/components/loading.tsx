import { Box, CircularProgress } from "@mui/material"

export const LoadingView=({size, color}:any)=>{
    return(
        <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress sx={{color:color ??'#303030'}} size={size} />
        </Box>
    )
}

