import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react";
const PlanFaqs = ({ data }) => {
    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                <h6 className="package-head">تفـــاصيل البـاقة !.</h6>
                <h3 className="package-title">وش نــوفر لك في الرحلــــة</h3>
                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >

                <Accordion type="single" collapsible className="xl:w-3/4 mx-auto" defaultValue="item-1" >
                    {
                        data.planFaq.map((faq, index) => (
                            <AccordionItem className="mb-4 border-none" key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger icon={
                                    <div className="bg-main-blue text-white  rounded-xl p-2">        
                                        <ChevronDown className="size-4 transition-transform duration-200 " />
                                    </div>
                                } className= " border-2 border-main-blue bg-body/70 p-8 rounded-xl text-main-blue font-bold ">{faq.question}</AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    <p className="bg-main-blue text-white p-8 rounded-xl">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>

                        ))
                    }
                </Accordion>
                </motion.div>
            </div>
        </section>
    )
}

export default PlanFaqs
