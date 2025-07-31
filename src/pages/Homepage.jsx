
import Footer from '../components/footer/Footer';
import MainHeader from '../components/header/MainHeader';
import AboutUS from '../components/home/aboutUs/AboutUS';
import AppSection from '../components/home/appSection/AppSection';
import HeroSection from '../components/home/heroSection/HeroSection';
import HotelsSection from '../components/home/hotelsSection/HotelsSection';
import PakageSection from '../components/home/pakageSection/PakageSection';
import Satatistics from '../components/home/satatistics/Satatistics';
import TotalHotelsSection from '../components/home/totalHotels/TotalHotelsSection';
export default function Homepage() {
    return (
        <div className="bodyCont">
            {/* <div className="container m-auto"> */}
            {/* <Header /> */}
            <main className='main-home relative'>
                <HeroSection />
                
                <HotelsSection />
                <PakageSection />
                <TotalHotelsSection />
                <AboutUS />
                <AppSection />
                <Satatistics/>
                <Footer />
            </main>
            {/* </div> */}
        </div>
    )
}
