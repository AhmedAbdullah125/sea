import { motion } from "framer-motion";
import magic from "../../../../public/app/magic.svg"
import quality from "../../../../public/app/quality.svg"
import thumb from "../../../../public/app/thumb.svg"
import flash from "../../../../public/app/flash.svg"

const Values = () => {

    const valuesData = [
        {
            icon: flash,
            alt: "الشفافية",
            title: "الشفافية !",
            desc: "نلتزم بالوضوح والمصداقية لنمنحك تجربة سفر مبنية على الثقة."
        },
        {
            icon: quality,
            alt: "الجودة",
            title: "الجودة !",
            desc: "نضمن لك رحلة مريحة، متقنة التفاصيل، تتجاوز توقعاتك منذ اللحظة الأولى."
        },
        {
            icon: magic,
            alt: "الابتكار",
            title: "الابتكار !",
            desc: "نستخدم أحدث التقنيات لنصنع لك رحلة سفر أكثر سلاسة وتميزاً."
        },
        {
            icon: thumb,
            alt: "التنوع",
            title: "التنوع !",
            desc: "نوفر وجهات وخيارات متنوعة تلائم اهتماماتك وتمنحك تجربة شخصية فريدة."
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="values-section py-16 relative"
        >
            <div className="container">
                <div className="values-header text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيم نبني بها رحلتك معنــــــا !</h2>
                    <p className="text-gray-600">قيم تُلهم رحلتك وتمنحك تجربة مختلفة.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {valuesData.map((item, index) => (
                        <div key={index} className="value-card flex flex-col items-center text-center">
                            <div className="icon-wrapper mb-6 relative">
                                <div className="bg-shape"></div>
                                <img src={item.icon} alt={item.alt} className="relative z-10 w-8 h-8 md:w-10 md:h-10 object-contain" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default Values
