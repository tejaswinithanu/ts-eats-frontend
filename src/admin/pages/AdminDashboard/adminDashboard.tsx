import { Box} from "@mui/material";
import { AdminNavbar } from "../../components/AdminNavbar/adminNavbar";
import SideBar from "../../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

export const AdminDashboard = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box sx={{ flexGrow: 1 }}>
        <AdminNavbar />
        <Box sx={{
          backgroundColor: 'white',
          minHeight: '85vh',
          height: '85vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none' 
          }
        }}>
          <Box sx={{ padding: "20px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>      
    </Box>
  );
};