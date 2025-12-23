import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import AboutSection from '../components/home/AboutSection'
import OurTeam from '../components/home/aboutUs/OurTeam'
import { motion } from 'framer-motion'
import Director from '../components/home/aboutUs/Director'
import Vision from '../components/home/aboutUs/Vision'
import Mission from '../components/home/aboutUs/Mission'
import Values from '../components/home/aboutUs/Values'
import AppSection from '../components/home/appSection/AppSection'
import Partners from '../components/home/aboutUs/Partners'


const About = () => {
    return (
        <main>
            <Header />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <AboutSection />
                {/* <OurTeam /> */}
                <Director />
                <Vision />
                <Mission />
                <Values />
                <Partners />
                <AppSection />

            </motion.div>
            <Footer />
        </main>
    )
}

export default About
