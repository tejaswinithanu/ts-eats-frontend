import { Box, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import { CategoryBar } from "../../components/CategoryBar/categoryBar";
import { useDispatch, useSelector } from "react-redux";
import { getMenuByCategory } from "../../../store/menuSlice";
import { MenuItemCard } from "../../components/MenuItemCard/menuItemCard";
import SlideUpFooter from "../../components/SlideUpFooter/SlideUpFooter";
import { getCartItems } from "../../../store/userSlice";

const backgroundImages :any= {
  Dessert: "url('https://img.freepik.com/premium-photo/table-with-cake-drinks-it_900775-11410.jpg')",
  Appetizer: "url('https://c8.alamy.com/comp/K9302G/home-made-canapes-small-sandwiches-appetizers-mix-of-different-finger-K9302G.jpg')",
  Beverage: "url('https://wallpaper.dog/large/20614147.jpg')",
  "Main Course": "url('https://i.pinimg.com/736x/ba/36/31/ba363114cb86bdac0e73bf15a881dd40.jpg')",
};

const Menu = () => {
  const { menuItemsByCategory, activeCategory, menuByCategoryStatus, onlyVeg, searchValue } = useSelector((state: any) => state.menuSlice);
  const { cartData } = useSelector((state: any) => state.userSlice);
  const { cartItems } = cartData;
  const userId = sessionStorage.getItem('userId');
  
  const dispatch = useDispatch();

  useEffect(() => {   
    dispatch<any>(getMenuByCategory(activeCategory));
    dispatch(getCartItems(userId));
  }, [dispatch, activeCategory, userId]);

  const backgroundImage = backgroundImages[activeCategory] || "url('https://png.pngtree.com/thumb_back/fw800/background/20240727/pngtree-mix-of-fresh-green-salad-leaves-with-arugula-lettuce-spinach-beets-image_16116028.jpg')";

  return (
    <Box
      sx={{
        padding: { xs: '0', lg: '15px 12vw' },
        backgroundImage: backgroundImage,
        backgroundAttachment: "fixed",
        minHeight: '100vh',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(36, 32, 48, 0.6)',
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
      </Box>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <CategoryBar />
      </Box>

      <Grid sx={{ padding: { xs: '1rem', md: '2rem' }, position: 'relative', zIndex: 2 }} container spacing={3}>
      {menuByCategoryStatus === 'loading'
  ? Array.from(new Array(8)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, bgcolor:'rgb(204, 203, 202, 0.3)' }} />
        <Skeleton variant="text" sx={{ mt: 1, width: '60%', bgcolor:'rgb(204, 203, 202, 0.3)' }} />
        <Skeleton variant="text" sx={{ width: '40%', bgcolor:'rgb(204, 203, 202, 0.3)' }} />
      </Grid>
    ))
  : onlyVeg
  ? menuItemsByCategory
      .filter((item: any) => 
        item.type.toLowerCase() === 'veg' &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((item: any) => (
        <MenuItemCard cartItems={cartItems} key={item.itemId} item={item} />
      ))
  : menuItemsByCategory
      .filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((item: any) => (
        <MenuItemCard cartItems={cartItems} key={item.itemId} item={item} />
      ))
}
      </Grid>
      <SlideUpFooter />
    </Box>
  );
}

export default Menu;
