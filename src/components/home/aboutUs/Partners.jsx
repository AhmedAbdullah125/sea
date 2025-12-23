import { motion } from "framer-motion"
import part1 from "../../../../public/app/part/1.png"
import part2 from "../../../../public/app/part/2.png"
import part3 from "../../../../public/app/part/3.png"
import part4 from "../../../../public/app/part/4.png"
import part5 from "../../../../public/app/part/5.png"
import part6 from "../../../../public/app/part/6.png"
import part7 from "../../../../public/app/part/7.png"
import part8 from "../../../../public/app/part/8.png"
import part9 from "../../../../public/app/part/9.png"
import part10 from "../../../../public/app/part/10.png"
import part11 from "../../../../public/app/part/11.png"
import part12 from "../../../../public/app/part/12.png"
import part13 from "../../../../public/app/part/13.svg"
import part14 from "../../../../public/app/part/14.png"
import part15 from "../../../../public/app/part/15.png"

const Partners = () => {
    const partners = [
        part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13, part14, part15
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="partners-section"
        >
            <div className="container">
                <div className="partners-header">
                    <h2 className="partners-title">
                        شــــــراكات نرتقي بهــــــا… ونبني معها تجارب تُخلّد السفــــــر !
                    </h2>
                    <p className="partners-description">
                        شركاء نثق بهم لنصنع رحلات راقية تتجاوز التوقعات.
                    </p>
                </div>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="partner-card"
                        >
                            <div className="partner-content">

                                <img src={partner} alt={partner} className="partner-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default Partners
