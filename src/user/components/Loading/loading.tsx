import { Box, CircularProgress, Typography } from "@mui/material"

export const LoadingView=()=>{
    return(
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
            <CircularProgress />
      </Box>
    )
}