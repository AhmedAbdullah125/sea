import { useState, useEffect } from 'react';
import Footer from '../components/footer/Footer';
import AboutSection from '../components/home/AboutSection';
import AboutUS from '../components/home/aboutUs/AboutUS';
import AppSection from '../components/home/appSection/AppSection';
import BigOffers from '../components/home/BigOffers';
import CustomerReviewsSection from '../components/home/CustomerReviewsSection';
import HeroSection from '../components/home/heroSection/HeroSection';
import FlatsSection from '../components/home/hotelsSection/FlatsSection';
import HotelsSection from '../components/home/hotelsSection/HotelsSection';
import PakageSection from '../components/home/pakageSection/PakageSection';
import Satatistics from '../components/home/satatistics/Satatistics';
import TotalHotelsSection from '../components/home/totalHotels/TotalHotelsSection';
import popupBG from '../../public/app/popup.png';
import seaLogo from '../../public/app/seaLogo.svg';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const lastShownDate = localStorage.getItem('lastPopupDate');
        const today = new Date().toDateString();
        // Check if popup was shown today
        if (lastShownDate !== today) {
            // Show popup
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 1000); // Slight delay for better UX

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
        // Mark as shown for today when closed or handled
        const today = new Date().toDateString();
        localStorage.setItem('lastPopupDate', today);
    };

    return (
        <div className="bodyCont">
            {/* <div className="container m-auto"> */}
            {/* <Header /> */}
            <main className='main-home relative'>
                <HeroSection />
                <BigOffers />
                <HotelsSection />
                <FlatsSection />
                <PakageSection />
                <TotalHotelsSection />
                <AboutUS />
                <CustomerReviewsSection />
                <AppSection />
                <AboutSection />
                {/* <Satatistics /> */}
                <Footer />

                {/* Daily Popup */}
                {/* {showPopup && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                        <div
                            className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row rtl:flex-row-reverse"
                        >
                            <div className="absolute inset-0 z-0">
                                <img src={popupBG} alt="Background" className="w-full h-full object-cover opacity-1" />
                            </div>

                            <div
                                className="absolute inset-0 z-0"
                                style={{
                                    background: 'linear-gradient(to left, rgba(201, 201, 201, .9), rgba(255, 255, 255, .4))'
                                }}
                            />

                            <button
                                onClick={handleClosePopup}
                                className="absolute top-4 left-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                            >
                                <X size={24} className="text-gray-600" />
                            </button>

                            <div className="flex-1 relative min-h-[300px] flex items-center justify-center p-8 z-10">
                            </div>

                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start text-right z-10">
                                <img src={seaLogo} alt="SEA Logo" className="relative z-10 w-12 md:w-24 opacity-80 mb-10" />
                                <p className="text-[#0b5184] text-lg md:text-xl font-medium mb-8 leading-relaxed">
                                    احجز باقتك الان مع sea واستمتع بافضل الفنادق وارقي وسائل النقل ،بادر الان واحصل علي خصم علي باقتك
                                </p>
                                <div className="flex flex-wrap gap-4 w-full">
                                    <Link
                                        to="/packages"
                                        onClick={handleClosePopup}
                                        className="px-6 py-3 bg-[#0b5184] text-white rounded-xl hover:bg-[#015a9b] transition-colors font-bold"
                                    >
                                        إكتشف عروضنا
                                    </Link>
                                    <button
                                        onClick={() => {
                                            window.open('https://wa.me/966500000000', '_blank'); // Replace with actual number if known, or generic
                                            handleClosePopup();
                                        }}
                                        className="px-6 py-3 border-2 border-[#0b5184] text-[#0b5184] rounded-xl hover:bg-blue-50 transition-colors font-bold"
                                    >
                                        تواصل الان
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
            </main>
            {/* </div> */}
        </div>
    )
}
