import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import { Link } from "react-router-dom"

export default function FAQs() {
    const faqs = [
        {
            id: "faq-1",
            question: "هل هناك التزام مالي محدد للحصول على العضوية؟",
            answer: "نعم، هناك رسوم عضوية سنوية تختلف حسب نوع العضوية التي تختارها. يمكنك الاطلاع على تفاصيل الأسعار والمزايا لكل نوع عضوية."
        },
        {
            id: "faq-2",
            question: "هل يمكنني ترقية عضويتي؟",
            answer: "نعم، يمكنك ترقية عضويتك في أي وقت للاستفادة من المزيد من المزايا والخدمات المميزة."
        },
        {
            id: "faq-3",
            question: "كيف استفيد من حالة التغيرات في العضوية؟",
            answer: "يمكنك متابعة حالة عضويتك وجميع التغييرات من خلال حسابك الشخصي على الموقع أو التطبيق."
        },
        {
            id: "faq-4",
            question: "ما هي مدة الالتزام بعضوية +Sea؟",
            answer: "لا توجد مدة التزام زمنية محددة. العضوية تعتمد على حد الصرف الترافقي لكل مستوى، وليس على عدد أو اشتراك سنوي."
        },
        {
            id: "faq-5",
            question: "هل يمكنني نقل العضوية لشخص آخر؟",
            answer: "العضوية شخصية ومرتبطة بحساب المستخدم ولا يمكن نقلها لشخص آخر."
        },
        {
            id: "faq-6",
            question: "ما هي الخطوات اللازمة لتجديد عضوية +Sea؟",
            answer: "العضوية تتجدد تلقائياً عند الوصول إلى حد الصرف المطلوب لكل مستوى. لا توجد خطوات يدوية للتجديد."
        }
    ]

    return (
        <div className="faqs-section">
            <div className="container">
                <div className="faqs-header">
                    <div className="r-side"><h2>أسئلة كثير نسمعها... جاوبنا عليها ! !</h2>
                        <p>احصل على إجابات واضحة للأسئلة الشائعة لتسهيل بحثك ...</p></div>
                    <Link to="/contact" className="about-btn">
                        <span>احجـــز الأن</span>
                        <div className="i-cont">
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                    </Link>
                </div>

                <div className="faqs-accordion">
                    <Accordion type="single" collapsible defaultValue="faq-4">
                        {faqs.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id} className="faq-item">
                                <AccordionTrigger className="faq-trigger">
                                    <span>{faq.question}</span>
                                    <i className="fa-solid fa-plus"></i>
                                </AccordionTrigger>
                                <AccordionContent className="faq-content">
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}