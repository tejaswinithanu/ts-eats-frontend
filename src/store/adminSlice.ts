import { createSlice } from "@reduxjs/toolkit";
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { SvgIconComponent } from "@mui/icons-material";

// Define the type for each action
interface AdminAction {
    actionId: number;
    action: string;
    icon: SvgIconComponent;
    description:string;
    redirectTo:String;
}

// Initialize actions with icons
const actions: AdminAction[] = [
    {
        actionId: 1,
        action: 'User Management',
        icon: PersonIcon,
        description: 'Manage users and profiles',
        redirectTo:'/user-management'
    },
    {
        actionId: 2,
        action: 'Menu Management',
        icon: RestaurantMenuIcon,
        description: 'Edit and update menu',
        redirectTo:'/menu-management'
    },
    // {
    //     actionId: 3,
    //     action: 'Order Management',
    //     icon: ShoppingCartIcon,
    //     description: 'Track and manage orders',
    //     redirectTo:'/order-management'
    // }
];

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        adminActions: actions,
        activeAction:''
    },
    reducers: {
        updateActiveAction:(state:any,action)=>{
            state.activeAction=action.payload
        }
    },
});

export const {updateActiveAction}=adminSlice.actions

export default adminSlice.reducer;
