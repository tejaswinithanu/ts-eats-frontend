import { Box } from '@mui/material'
import Footer from '../components/footer'
import HeroSection from '../components/heroSection'
import Navbar from '../components/navbar'
import SlideUpFooter from '../components/SlideUpFooter'
import './../../styles/home.css'
import { AboutUs } from '../components/about'
import { CateringSection } from '../components/aboutMenu'

const Home=()=>{
    return(
        <div className='home-container'>
            <div className='sub-home-container'>
                <Box sx={{padding:{ xs: '0', lg: '15px 12vw' }}}  >
                    <Navbar/>
                    <HeroSection/>
                </Box>
           </div>
           
            <Box sx={{bgcolor:'var(--primary-color)'}}>
                <Box sx={{padding:{ xs: '0', lg: '10px 12vw' }}}  >
                    <CateringSection/>
                </Box>
            </Box>
            <Box sx={{padding:{ xs: '0', lg: '10px 12vw' }}}  >
            <AboutUs/>
            </Box>
           <Footer/>
           <SlideUpFooter/>
        </div>
    )
}

export default Home