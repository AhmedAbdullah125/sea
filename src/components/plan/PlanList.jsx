
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ogblogs from "../../../public/og-blogs.png"
import { motion } from "framer-motion";
import parse from "html-react-parser";

const PlanList = ({ data, settings }) => {


    return (
        <section className="package-section py-10 bg-white planList" dir="rtl">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-8"
                >
                    <h6 className="package-head">تفاصيل البــاقة !.</h6>
                    <h3 className="package-title">وش نـوفر لك في الرحلـــة؟</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </motion.div>

                <Accordion type="single" collapsible className="w-full rounded-xl overflow-hidden accordion" defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gray-100/50 rounded-full accordionTrigger">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-white font-bold">
                                    <img src={ogblogs} alt="ogblogs" className="size-6" />
                                </div>
                                <span className="text-xl font-bold text-gray-800">إكتشــف جـدول البــاقة</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="w-full overflow-x-auto">
                                <div className="min-w-[800px]">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-12 gap-4 mt-2 bg-gray-100 py-5 px-5 rounded-full font-bold text-gray-700 text-sm">
                                        <div className="col-span-3 text-right">اليوم</div>
                                        <div className="col-span-4 text-right">الأنشطة الرئيسية</div>
                                        <div className="col-span-5 text-right">الوصف والتفاصيل</div>
                                    </div>

                                    {/* Table Body */}
                                    <div className="divide-y divide-gray-100">
                                        {data?.provider_for_you?.map((item, index) => (
                                            <div key={index} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors">
                                                <div className="col-span-3 font-bold text-right flex items-center gap-4">
                                                    <img src={item.image} alt="" className="w-20 h-20 rounded-2xl" />
                                                    {item.day}
                                                </div>
                                                <div className="col-span-4 font-medium text-right flex items-center gap-2">
                                                    <span>{item.activities}</span>
                                                </div>
                                                <div className="col-span-5 text-sm text-right">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
                                                    <p>{parse(item.description)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section >
    )
}

export default PlanList
