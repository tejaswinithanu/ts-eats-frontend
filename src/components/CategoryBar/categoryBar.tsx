import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react";

const categories=[
    {
        id:1,
        categoryName:'Starters'
    },
    {
        id:2,
        categoryName:'Main Course'
    },
    {
        id:3,
        categoryName:'Munchies'
    },
    {
        id:4,
        categoryName:'Tiffens'
    }
]

export const CategoryBar=()=>{

    const [selectedCategory, setSelectedCategory] = useState(categories[0].categoryName);

    const handleCategoryChange = (event:any, newCategory:any) => {
        console.log(newCategory)
        setSelectedCategory(newCategory);
      };

    return(
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="menu categories"
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#dbb84f',
            },
          }}
        >
          {categories.map((category) => (
            <Tab 
            sx={{
                    color:'white','&.Mui-selected': {
                    color: '#dbb84f', 
            }}} key={category.id} label={category.categoryName} value={category.categoryName} />
            ))}
        </Tabs>
      </Box>)
}