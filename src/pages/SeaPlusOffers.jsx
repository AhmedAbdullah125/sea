import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import SeaPlusOffersHero from '../components/WhySea/SeaPlusOffersHero'
import SeaPlusPlans from '../components/WhySea/SeaPlusPlans'
import MembershipAdvantages from '../components/WhySea/MembershipAdvantages'
import FAQs from '../components/WhySea/FAQs'
import AppSection from '../components/home/appSection/AppSection'

const SeaPlusOffers = () => {
    return (
        <main>
            <Header />
            <SeaPlusOffersHero />
            <SeaPlusPlans />
            <MembershipAdvantages />
            <FAQs />
            <AppSection />
            <Footer />

        </main>
    )
}

export default SeaPlusOffers
