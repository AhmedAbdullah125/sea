import { motion } from "framer-motion"
import missionimage from "../../../../public/app/missionimg.jpeg"
import { Link } from "react-router-dom"

const Mission = () => {

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-section py-16 relative"
        >
            <div className="circle1 right-0 dir-right">
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
                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="about-content"
                    >
                        {/* Tag */}
                        <div className="vision-tag">رسالتنا</div>

                        {/* Title */}
                        <div className="about-title">
                            رســـــــالتنا… سفر يلهمك ويمنحك
                            <br />
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-blue">اقيمة حقيقيـــــــة في كل خطوة !</span>
                            </div>
                        </div>

                        {/* Profile Images */}

                        {/* Description List */}
                        <div className="about-list">
                            <div className="about-item">
                                <p>نسعى في سي إلى تقديم تجربة سفر تُلهم الإنسان، توسّع آفاقه، وتضيف معنى لحياته، عبر خدمات متقنة، تفاصيل مريحة، ورحلات تُسهم في تطوير ذاته وجودة يومه.</p>
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

                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="about-image"
                    >
                        <img src={missionimage} alt="Sea Tourism" />
                    </motion.div>


                </div>
            </div>
        </motion.section>
    )
}

export default Mission
