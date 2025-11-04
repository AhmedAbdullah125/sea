import { motion } from "framer-motion"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LazyLoadImage } from "react-lazy-load-image-component";
const PlanPrices = ({ data, settings }) => {
    function convertDate(inputDate) {
        const months = [
            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];

        const daysOfWeek = [
            "الأحد", "الاثنين", "الثـــلاثـاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
        ];

        const date = new Date(inputDate); // Parse the date string into a Date object
        const dayOfWeek = daysOfWeek[date.getDay()]; // Get the day of the week
        const day = date.getDate(); // Get the day of the month
        const month = months[date.getMonth()]; // Get the month name in Arabic
        const year = date.getFullYear(); // Get the year

        // Return the formatted date in Arabic
        return `${dayOfWeek}, ${day} ${month} ${year}`;
    }
    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h6 className="package-head">البـــاقة !</h6>
                    <h3 className="package-title">أسعــــــار البــاقة</h3>
                    <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                </motion.div>
                {/* <div className="package-cont">
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

                </div> */}
                <div className="package-detils">
                    <img className="package-img" src={data.thumbnail} alt={data.title} />
                    <div className="all-details">
                        <div className="upper-part">
                            <div className="title-alert">
                                <h3>{data.title}</h3>
                                <AlertDialog className="sm:rounded-xl rounded-lg">
                                    <AlertDialogTrigger asChild >
                                        <span className="font-bold text-sm cursor-pointer">عــرض التفــاصيل <i class="fa-solid fa-left-long text-lg"></i></span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white rounded-xl overflow-hidden">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle >
                                                <div className="dg-title w-full flex items-center justify-between border-b-2 border-gray-200 p-5">
                                                    <span>تفاصيـل البــــاقة</span>
                                                    <AlertDialogCancel><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                                </div>
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <div className="pc-feats">
                                                    <h4>{data.title}</h4>
                                                    <h5>تشمل البــاقة !</h5>
                                                    <div className="fts-grid">
                                                        <div className="fasel"></div>
                                                        {
                                                            data?.planComponents?.map((item) => (
                                                                <div className="grid-item" key={item.id}>
                                                                    <LazyLoadImage src={item.icon} alt="sea" loading='lazy' />
                                                                    <span>{item.name}</span>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="l-side">
                                                        <motion.a
                                                            initial={{ opacity: 0, y: 50 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1 }}
                                                            href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link"><span>أحصل على بـــاقتك الان</span>
                                                        </motion.a>
                                                        <motion.a
                                                            initial={{ opacity: 0, y: 50 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1 }}
                                                            href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link custom-wa">
                                                            <i className="fa-brands fa-whatsapp"></i></motion.a>

                                                    </div>
                                                </div>
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        {/* <AlertDialogFooter>
                                            <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter> */}
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <div className="dates-persons">
                                <div className="ele">
                                    <h3>
                                        {convertDate(data.startDate)}
                                    </h3>
                                    <span>من تـــاريخ :</span>
                                </div>
                                <div className="fasel"></div>
                                <div className="ele">
                                    <h3>
                                        {convertDate(data.arrivalTime)}
                                    </h3>
                                    <span>إلـي تـــاريخ :</span>
                                </div>
                                <div className="fasel"></div>
                                <div className="ele">
                                    <h3>{data.numberOfPerson} أشخــاص</h3>
                                    <span>عدد الأشخــاص :</span>
                                </div>
                            </div>
                        </div>
                        <div className="lower-part">
                            <div className="r-side">
                                <div className="price">
                                    <span>{Number(data.cost).toFixed(3)} <span className="currency-name">{data.currencyName}</span></span>
                                    <p>المجموع ل (1) غرفة</p>
                                </div>
                                <div className="fasel"></div>
                                <div className="pay-methods">
                                    <div className="pay-images">
                                        {
                                            data.paymentMethodImages.map((img) => (
                                                <div className="payment-item" key={img.id}>
                                                    <img src={img.image} alt="pay-img" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <span>قابل للإسترداد</span>
                                </div>
                            </div>
                            <div className="l-side">
                                <motion.a
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link"><span>أحصل على بـــاقتك الان</span>
                                </motion.a>
                                <motion.a
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link custom-wa">
                                    <i className="fa-brands fa-whatsapp"></i></motion.a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default PlanPrices
