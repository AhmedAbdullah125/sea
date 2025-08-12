import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import playImg from '../../assets/play.png'

const PlanFaqs = ({ data }) => {
    return (
        <section className="package-section">
        <div className="container">
            <h6 className="package-head">تفـــاصيل البـاقة !.</h6>
            <h3 className="package-title">وش نــوفر لك في الرحلــــة</h3>
            <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {
                    data.planFaq.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <p>{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                        
                    ))
                }
            </Accordion>
        </div>
    </section>
    )
}

export default PlanFaqs
