import { motion } from "framer-motion"
import visionimage from "../../../../public/app/aboutimg.jpeg"
import { Link } from "react-router-dom"

const Vision = () => {

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-section py-16 relative"
        >
            <div className="circle1 left-0 " >
                <div className="circle2">
                    <div className="ball"></div>
                    <div className="circle3">
                        <div className="circle4">
                            <div className="ball"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="about-grid">

                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="about-image"
                    >
                        <img src={visionimage} alt="Sea Tourism" />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="about-content"
                    >
                        {/* Tag */}
                        <div className="vision-tag">رؤيتنا</div>

                        {/* Title */}
                        <div className="about-title">
                            رؤيتنـــــــا… لنكون خيــارك
                            <br />
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-blue">الأول لكل رحلــة استثنـائية !</span>

                            </div>
                        </div>

                        {/* Profile Images */}

                        {/* Description List */}
                        <div className="about-list">
                            <div className="about-item">
                                <p>نطمح في سي إلى ابتكار تجربة سفر متكاملة، راقية وسلسة، تمنح كل مسافر لحظات تُخلّد في الذاكرة، وتجعله يختارنا كخيار أول لكل رحلاته المستقبلية.</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="about-contact">
                            <Link to={"/sea-plus-offers"} className="about-btn">
                                <span>إكتشف عروضنــا</span>
                                <div className="i-cont">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default Vision
