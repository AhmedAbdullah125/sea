import { motion } from "framer-motion"
import teamMemberImage from "../../../../public/app/teamMemberImage.png"
import part from "../../../../public/app/part.svg"


export default function OurTeam() {
    const teamMembers = [
        { name: "عبـــــــد الله مصري", image: teamMemberImage },
        { name: "أحمــــد عطاء", image: teamMemberImage },
        { name: "خديجــــــة عبـــد الرازق", image: teamMemberImage },
        { name: "أسامــــــة إشرف", image: teamMemberImage },
        { name: "محمــــود أبــــــراهيم", image: teamMemberImage },
        { name: "مصعــــــب ابــــــراهيم", image: teamMemberImage },
        { name: "بشــرى احســـان", image: teamMemberImage },
        { name: "صـــدوه عطـــالله", image: teamMemberImage },
        { name: "ابـــراهيم ابوالذهــــب", image: teamMemberImage },
        { name: "عــــلاء علــــي", image: teamMemberImage },
    ];

    return (
        <section className="our-team-section py-16">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="team-header"
                >
                    <div className="team-tag">فريــقنا</div>
                    <h2 className="team-title">
                        وراء كل إنجـــاز .. فريــــق بقوم اللعبة !
                    </h2>
                    <p className="team-subtitle flex items-center gap-2">
                        <img src={part} alt="" className="w-5 h-5" />
                        لســنا مــجرد شركــــة ســفر.. نحــن شريــــك رحلتك مــن بدايتــها إلــى نهايتــها.
                    </p>
                </motion.div>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="team-card"
                        >
                            <div className="team-card-image">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <h3 className="team-card-name gradient-text">{member.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
