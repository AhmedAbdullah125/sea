import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import WhyHero from '../components/WhySea/WhyHero'
import OurWork from '../components/WhySea/OurWork'
import Services from '../components/WhySea/Services'
import Advantages from '../components/WhySea/Advantages'
import CustomerReviewsSection from '../components/home/CustomerReviewsSection'
import AppSection from '../components/home/appSection/AppSection'


const WhySea = () => {
    return (
        <main>
            <Header />
            <WhyHero />
            <OurWork />
            <Services />
            <Advantages />
            <CustomerReviewsSection />
            <AppSection />
            <Footer />
        </main>
    )
}

export default WhySea
