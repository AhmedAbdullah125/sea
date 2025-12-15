import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import mada from "../../../public/app/mada.svg"
import visa from "../../../public/app/visa.svg"
import mastercard from "../../../public/app/mastercard.svg"
import stc from "../../../public/app/stc.svg"
import applePay from "../../../public/app/applePay.svg"
const TikTokPayments = () => {
    const paymentMethodImages =[
        {image:mada},
        {image:visa},
        {image:mastercard},
        {image:stc},
        {image:applePay},
    ]

    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h6 className="tiktok-body-title">دفع امن وسهل</h6>
                    <h3 className="tiktok-body-main-title">وســائل الدفع المتنوعـــة !</h3>
                    <p className="tiktok-body-text">لسنـــا مجـرد شركــة سفـر… نحن شــريك رحلتك مـن بدايتــها إلى نهايتــها ..</p>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {paymentMethodImages.map((image) => (
                        <div className="pay-item min-w-48">
                            <LazyLoadImage src={image.image} alt="pay-img" className="min-w-20 max-h-full" />
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </motion.div>
        </section>

    )
}

export default TikTokPayments
