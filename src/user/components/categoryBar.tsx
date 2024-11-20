import { Box, FormControlLabel, Switch, Tab, Tabs, Skeleton, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, setActiveCategory, toggleVeg, updateSearchValue } from "./../../store/menuSlice";
import { useNavigate } from "react-router-dom";

export const CategoryBar = () => {
  const { categories, activeCategory, getCategoriesStatus } = useSelector((state: any) => state.menuSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch<any>(getAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  const handleCategoryChange = (event: any, newCategory: any) => {
    dispatch(setActiveCategory(newCategory));
    navigate(`/menu/${newCategory}`);
  };

  const handleVegToggle = async () => {
    await dispatch(toggleVeg());
  };

  const onChangeSearchValue = (e: any) => {
    dispatch(updateSearchValue(e.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        mb: 3,
        px: 2,
        gap: isMobile ? 2 : 0,
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}
    >
      {getCategoriesStatus === 'loading' ? (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
          {Array.from(new Array(4)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={isMobile ? '100%' : 80} height={40} sx={{ borderRadius: 1, bgcolor: 'rgba(204, 203, 202, 0.3)' }} />
          ))}
        </Box>
      ) : (
        <Tabs
          value={activeCategory}
          sx={{borderBottom:1, borderColor: 'gray',width : isMobile ? '100%' : '55%', marginRight:isMobile? '0' : '30px',
            '& .MuiTabs-scrollButtons': {
              color: '#f7bc0a', // Change arrow color
            },
            '& .MuiTabs-scrollButtons.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.3)', // Optional: faded color when disabled
        },}}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="menu categories"
          allowScrollButtonsMobile
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#f7bc0a',
            },
          }}
        >
          {categories.map((category: any) => (
            <Tab
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  color: '#dbb84f',
                },
              }}
              key={category.categoryId}
              label={category.category}
              value={category.category}
            />
          ))}
        </Tabs>
      )}
      <Box sx={{display:'flex', justifyContent:'space-between', flexGrow:1}}>
      <TextField onChange={onChangeSearchValue} label="Search by dish" type="search" variant="outlined"
        sx={{
          marginRight:'20px',
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--primary-color)",
              
            },
            "&:hover fieldset": {
              borderColor: "white", // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary-color)", // Outline color when focused
            },
            color: "white", // Text color
          },
          "& .MuiInputLabel-root": {
            color: "#d4d4d4", // Label color when unfocused
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--primary-color)", // Label color when focused
          },
          
        }}
        InputProps={{
          style: {
            height: "3rem", // Control height through InputProps
          },
        }}
      />
      <FormControlLabel
        onClick={handleVegToggle}
        sx={{
          color: 'white',
          fontWeight: 'bold',
          flexDirection: isMobile ? 'row-reverse' : 'row', // Adjust label direction on mobile
        }}
        control={
          <Switch
            color="default"
            sx={{
              bgcolor: 'var(--primary-color)',
              marginRight: isMobile ? 0 : '5px',
              borderRadius: '5px',
            }}
          />
        }
        label="Veg Only"
      />
      </Box>
    </Box>
  );
};
