import Footer from '../../components/Footer/footer'
import HeroSection from '../../components/HeroSection/heroSection'
import MenuSection from '../../components/MenuSection/menuSection'
import Navbar from '../../components/Navbar/navbar'
import SlideUpFooter from '../../components/SlideUpFooter/SlideUpFooter'
import './home.css'

const Home=()=>{
    return(
        <div className='home-container'>
            <div className='sub-home-container'>
                <Navbar/>
                <HeroSection/>
           </div>
           <MenuSection/>
           <Footer/>
           <SlideUpFooter/>
        </div>
    )
}

export default Home