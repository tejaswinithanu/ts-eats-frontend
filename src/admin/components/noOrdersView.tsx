import { Box, Typography } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const NoOrdersView=()=>{
    return(
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: "grey.500", mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            No orders found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            This user hasn't placed any orders yet.
          </Typography>
        </Box>
    )
}