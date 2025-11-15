import img1 from '../../../public/app/s.svg'
import img2 from '../../../public/app/check.svg'
import profileActive from '../../../public/app/profileActive.svg'
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const HotelBook = ({ data }) => {
    return (
        <section className="content-section">
            <div className="container">
                <div className="damans">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="daman">
                        <div className="r-side">
                            <div className="img-cont">
                                <img src={img1} alt="" />
                            </div>
                            <div className="info">
                                <h3>ضمــــــــان سي / SEA. <img src={img2} alt="" /></h3>
                                <span>نضمن لك صحة المعلومات ونظافة المكان</span>
                            </div>
                        </div>

                    </motion.div>
                    {
                        data.caption ?
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full daman"
                                defaultValue="item-1"
                            >
                                <AccordionItem value="item-2" className="daman-accordion w-full">
                                    <AccordionTrigger className=" p-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="flex items-center justify-between w-full">
                                            <div className="r-side">
                                                <div className="name-cont">
                                                    {/* first letter of the name */}
                                                    {
                                                        data?.hotel_logo ?
                                                            <img src={data.hotel_logo} alt="profile" /> :
                                                            data?.ownerName ?
                                                                data.ownerName.slice(0, 1) :
                                                                <img src={profileActive} alt="profile" />
                                                    }
                                                </div>
                                                <div className="info">
                                                    <h3>{data.ownerName ? data.ownerName : "عميل ســـي"} <img src={img2} alt="" /></h3>
                                                    <div className="dets"><p><i className="fa-solid fa-star"></i> <span>{Number(data.ownerRating).toFixed(1)}</span></p> <div className="fasel"> <p>
                                                        {
                                                            data?.rentalPeriod ?
                                                                <>
                                                                    <i className="fa-solid fa-house"></i>
                                                                    <span>{data.rentalPeriod}</span>
                                                                </>
                                                                : null
                                                        }
                                                    </p></div></div>
                                                </div>
                                            </div>
                                            <div className="l-side">
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </div>
                                        </motion.div>

                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
                                        <p>
                                            {data.caption}
                                        </p>

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            :
                            <div className="daman">

                                <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex items-center justify-between w-full">
                                    <div className="r-side">
                                        <div className="name-cont">
                                            {/* first letter of the name */}
                                            {
                                                data?.hotel_logo ?
                                                    <img src={data.hotel_logo} alt="profile" /> :
                                                    data?.ownerName ?
                                                        data.ownerName.slice(0, 1) :
                                                        <img src={profileActive} alt="profile" />
                                            }
                                        </div>
                                        <div className="info">
                                            <h3>{data.ownerName ? data.ownerName : "عميل ســـي"} <img src={img2} alt="" /></h3>
                                            <div className="dets"><p><i className="fa-solid fa-star"></i> <span>{Number(data.ownerRating).toFixed(1)}</span></p> <div className="fasel"> <p>

                                                {
                                                    data?.rentalPeriod ?
                                                        <>
                                                            <i className="fa-solid fa-house"></i>
                                                            <span>{data.rentalPeriod}</span>
                                                        </>
                                                        : null
                                                }
                                            </p></div></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default HotelBook
