import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
const PlanMarq = ({ data }) => {

    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h6 className="package-head">الدفع !</h6>
                    <h3 className="package-title">نوفـــر لك أفضــل وســـائل الدفع</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {data.paymentMethodImages.map((review) => (
                        <div className="pay-item min-w-48">
                            <LazyLoadImage src={review.image} alt="pay-img" className="min-w-20 max-h-full" />
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </motion.div>
        </section>

    )
}

export default PlanMarq
