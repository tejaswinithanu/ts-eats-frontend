
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const EmptyCartView = () => {

    const navigate=useNavigate()

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '90vh', 
                textAlign: 'center', 
                backgroundColor: 'var(--primary-color)', // Light background color
                padding: 2 
            }}
        >
            <img src='https://res.cloudinary.com/dqqijdyjr/image/upload/v1730897733/cartoon-550_256_x1dhyb.gif' alt="Empty Cart" style={{ width:'200px', marginBottom: '16px', borderRadius:'8px' }} />
            <Typography variant="h4" gutterBottom>
                Your Cart is Empty
            </Typography>
            <Typography variant="body1" gutterBottom>
                Looks like you haven't added anything to your cart yet.
            </Typography>
            <Typography variant="body2" gutterBottom>
                View menu now and add items to your cart!
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: 2 }}
                onClick={() => navigate('/menu')} // Handle your shop redirection here
            >
                View Menu
            </Button>
        </Box>
    );
};


