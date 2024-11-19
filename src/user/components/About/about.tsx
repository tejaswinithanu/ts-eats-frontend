import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';

export const AboutUs = () => {
  return (
    <Container id="aboutUs" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography sx={{color:'white'}} variant="h3" align="center" gutterBottom>
        About Us
      </Typography>

      <Typography sx={{color:'#c2c2c2'}} variant="h6" paragraph>
        Welcome to TS Eats, where we serve delicious food crafted with love and passion. Our restaurant is dedicated to providing an unforgettable dining and tasting experience for every guest.
      </Typography>

      <Box sx={{ my: 4 }}>      
        
        <Typography sx={{color:'white'}} variant="h5" align="center" gutterBottom>
          Our Story
        </Typography>
        <Typography sx={{color:'#c2c2c2'}} paragraph>
          TS Eats was founded in 2020 with the goal of bringing people together through great food. Our journey began with a passion for cooking and a desire to share that passion with the community. We believe that food is more than just sustenance; it’s a way to connect with others and create lasting memories.
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography sx={{color:'white'}} variant="h5" align="center" gutterBottom>
          Our Mission
        </Typography>
        <Typography sx={{color:'#c2c2c2'}} paragraph>
          At TS Eats, our mission is to provide high-quality, flavorful meals made from the freshest ingredients. We strive to create a warm and inviting atmosphere where families and friends can gather to enjoy each other’s company and celebrate life’s moments.
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography sx={{color:'white'}} variant="h5" align="center" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: '16px', textAlign: 'center' }}>
              <Avatar
                alt="Chef Sarah"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTJjEFf4GwZq0n2vhJ_Y83OyRCxVFEsOqEnA&s"
                sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
              />
              <Typography sx={{padding:'10px' }} gutterBottom variant="h6">Chef Sarah</Typography>
              <Typography>Head Chef & Founder</Typography>
              <Typography>With over a decade of culinary experience, Chef Sarah brings creativity and expertise to our kitchen.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: '16px', textAlign: 'center' }}>
              <Avatar
                alt="Tom Johnson"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gTfb7lCoUS0nQdkTKdq8IIHetHQyRFxNEQ&s"
                sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
              />
              <Typography sx={{  padding:'10px' }} gutterBottom variant="h6">Tom Johnson</Typography>
              <Typography>Restaurant Manager</Typography>
              <Typography>Tom ensures every guest has a delightful experience from the moment they walk in.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: '16px', textAlign: 'center' }}>
              <Avatar
                alt="Lisa Chen"
                src="https://cdn.prod.website-files.com/63e067f8a0956f833f9154f2/63e63ad9b8870e2454082f72_AdobeStock_550467202.jpg"
                sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
              />
              <Typography sx={{ padding:'10px' }} gutterBottom variant="h6">Lisa Chen</Typography>
              <Typography>Head of Marketing</Typography>
              <Typography>Lisa connects our restaurant with the community through innovative marketing strategies.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 4 , color:'white'}}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography sx={{color:'#c2c2c2'}} paragraph align="center">
          If you have any questions, please contact us at:
        </Typography>
        <Typography sx={{color:'#c2c2c2'}} paragraph align="center">
          Email: contact@tseats.com | Phone: 8437779807
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
