
import AboutUS from '../components/home/aboutUs/AboutUS';
import AppSection from '../components/home/appSection/AppSection';
import Header from '../components/home/Header';
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
            <main className='main-home'>
                <HeroSection />
                <HotelsSection />
                <PakageSection />
                <TotalHotelsSection />
                <AboutUS />
                <AppSection />
                <Satatistics/>
            </main>
            {/* </div> */}
        </div>
    )
}
