import TikTokServices from "../components/Tiktok/Services"
import TiktokBody from "../components/Tiktok/TiktokBody"
import TiktokHeader from "../components/Tiktok/TiktokHeader"
import TikTokPayments from "../components/Tiktok/TikTokPayments"

const Tiktok = () => {
    return (
        <section className="tiktok-content">
            <TiktokHeader />
            <TiktokBody />
            <TikTokPayments />
            <TikTokServices />
            {/* <Footer /> */}
        </section>
    )
}

export default Tiktok
