import { motion } from "framer-motion"
import director from "../../../../public/app/teamMemberImage.png"
import logo from '../../../../public/app/footerLogo.svg'
import signture from '../../../../public/app/signture.png'
import contations from '../../../../public/app/contations.svg'

export default function Director() {
    return (
        <section className="director-section bg-body py-16">
            <div className="container">
                {/* Title with Border */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="director-header"
                >
                    <div className="director-title-box">
                        <h2 className="director-title">
                            كلمـــة الرئــــــيس
                            <br />
                            <span className="text-blue">التنفيـــذي !.</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="director-content">

                    {/* Director Photo */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="director-photo-card"
                    >
                        <div className="director-photo">
                            <img src={director} alt="أسامة إشداد - الرئيس التنفيذي" />
                        </div>
                    </motion.div>
                    {/* Message Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="director-message-card"
                    >
                        <div className="header-director">

                            {/* Quote Icon */}
                            <div className="quote-icon">
                                <img src={contations} alt="" />
                            </div>
                            {/* Logo */}
                            <div className="director-logo">
                                <img src={logo} alt="Sea Tourism" />
                            </div>
                        </div>

                        {/* Message Text */}
                        <p className="director-message">
                            نسعـــى لتـرك أثـر إيجابـــي فــي قطاع السياحة والضيافــة، ونحرص على بنــاء علاقــات قائمــة
                            <span className="highlight-text"> على الثقة والاحتـــرام المتبادل.</span> نشاركـــكم على تقدمـــكم، ونتطلع للعمــــل معا لتحقيق أهدافنـــا
                            المشتركــة. وندعو شركــــة سي للتكون في طليعــة الشركــات الريــادة في السفــر
                            والسياحــة.
                        </p>

                        {/* Signature Section */}
                        <div className="director-signature">
                            <div className="signature-info">
                                <h3 className="gradient-text">أ.أســـامة إمـداد</h3>
                                <p>الرئيس التنفيذي لسي</p>
                            </div>
                            <div className="signature-image">
                                <img src={signture} alt="Signature" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

