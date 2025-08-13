import { motion } from "framer-motion"
const PlanPrices = ({ data,settings }) => {
    console.log(data);
    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                >
                <h6 className="package-head">البـــاقة !.</h6>
                <h3 className="package-title">أسعــــــار البــاقة</h3>
                <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                </motion.div>
                <div className="package-cont">
                    {
                        data.planRooms.map((room, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: -50, x: 50 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="package-item space-y-4 " key={index}>
                                <h5 className="text-xl font-bold text-center">{room.name}</h5>
                                <img src={room.icon} alt="img" className="h-[180px]  rounded-xl mx-auto hover:scale-105 transition-all duration-300"  />
                                <span className="flex items-center gap-2 justify-center font-bold"><i className="fa-solid fa-circle-check text-main-blue"></i><span>{room.age_groups} سنـــوات.</span></span>
                                <div className="text-main-blue text-xl font-bold text-center">{Number(room.price).toFixed(1)} <span> {room.currency_name}</span>
                                </div>
                            </motion.div>
                        ))
                    }

                </div>
                <motion.a
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link"><span>أحصل على بـــاقتك الان</span>
                    <i className="fa-brands fa-whatsapp"></i></motion.a>
            </div>
        </section>
    )
}

export default PlanPrices
