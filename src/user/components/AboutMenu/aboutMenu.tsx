import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { BreakfastDining, LunchDining, DinnerDining } from '@mui/icons-material';

const caterings = [
    {
        id: 1,
        catering: 'Breakfast',
        description: "At TS Eats, breakfast isn’t just a meal—it’s an experience. We specialize in energizing, chef-inspired breakfasts to kick-start your day. From handcrafted pastries and artisan coffee to customizable omelets and fresh smoothies, every breakfast item is made with the finest ingredients.",
        icon: <BreakfastDining fontSize="large" />
    },
    {
        id: 2,
        catering: 'Lunch',
        description: "TS Eats elevates lunch with dishes that combine creativity and nutrition for a fulfilling midday meal. Our lunch catering features signature salads, gourmet sandwiches, and chef-curated entrees designed to keep you fueled throughout the day.",
        icon: <LunchDining fontSize="large" />
    },
    {
        id: 3,
        catering: 'Dinner',
        description: "Dinner at TS Eats is all about refined flavors and memorable dining experiences. We specialize in thoughtfully curated menus that range from elegant multi-course dinners to comforting family-style meals. Each dish is crafted to bring out the natural flavors of premium ingredients",
        icon: <DinnerDining fontSize="large" />
    }
];

export const CateringSection = () => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' sx={{ padding: 2, paddingTop:'40px', paddingBottom:'40px' }}>
            <Box sx={{marginBottom:'30px', width:'50%'}}>
            <Typography sx={{textAlign:'center', fontFamily:'Times New Roman', fontWeight:'bold'}} variant='body1'>
                TS Eats offers a memorable dining experience with dishes crafted from fresh, locally-sourced ingredients, blending bold flavors with creative presentation. From hearty breakfasts to exquisite dinners, every meal celebrates the art of exceptional cuisine.
            </Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
                {caterings.map((catering) => (
                    <Grid item xs={12} sm={6} md={4} key={catering.id}>
                        <Card sx={{ height: '100%', borderTopLeftRadius:"20%",borderTopRightRadius:"20%", boxShadow:'4px 4px 10px 1px #333333' }}>
                            <CardContent>
                                <Box display="flex" flexDirection='column' alignItems="center">
                                    {/* Icon */}
                                    <Box sx={{padding:'10px', borderRadius:'50%', backgroundColor:'var(--primary-color)'}}>{catering.icon}</Box>
                                    <Box display="flex" flexDirection='column' alignItems="center">
                                        {/* Catering Title */}
                                        <Typography variant="h6" fontWeight="bold">
                                            {catering.catering}
                                        </Typography>
                                        {/* Catering Description */}
                                        <Typography variant="body2" color="textSecondary">
                                            {catering.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


