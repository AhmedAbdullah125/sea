import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
const PackageHotels = ({ data }) => {
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
                    <h6 className="package-head">فنـادق الباقـة !.</h6>
                    <h3 className="package-title">وش الفنادق المتاحة في البــاقة؟</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </motion.div>
                <div className="grid-cont">

                    {
                        data?.hotels.map((item, index) =>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="card-item" key={index}>
                                <Link to={`/hotel/${item.slug}`} className="related-item block">
                                    <Swiper
                                        pagination={{ clickable: true }}
                                        spaceBetween={0}
                                        navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
                                        slidesPerView={1}
                                        autoplay={true}
                                        loop={true}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        breakpoints={{
                                            1400: {
                                                slidesPerView: 1,
                                            },

                                        }}
                                    >

                                        {
                                            item.images.map((img, index) => (
                                                <SwiperSlide key={index}>
                                                    <figure>
                                                        <img src={img} alt="img" />
                                                    </figure>
                                                </SwiperSlide>
                                            ))
                                        }
                                        <div className="swiper-btn-cont swiper-btn-2" id={`swiper-btn-prev1a`}>
                                            <div className="swiper-btn-prev swiper-btn">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>

                                            <div className="swiper-btn-next swiper-btn" id={`swiper-btn-next1a`}>
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </div>
                                        </div>
                                    </Swiper>
                                    <div className="related-content">
                                        <div className="related-btn">
                                            {/* <span>{Number(item.discount)}%</span> */}
                                            <button

                                                onClick={
                                                    () => {
                                                        if (sessionStorage.getItem('token')) {
                                                            toggleFavourates(item.id, 'Hotel');
                                                        }
                                                        else {
                                                            toast.error('يجب تسجيل الدخول اولا')
                                                            window.location.href = '/login'
                                                        }
                                                    }
                                                }
                                            ><i className={`fa-heart  fa-regular`}></i></button>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={`/hotel/${item.slug}`} className="card-content">
                                    <div className="detail-info-item rate">
                                        <i className="fa-solid fa-star"></i>
                                        <span>{item?.rate_name ? item?.rate_name : "0"} </span>
                                    </div>
                                    <div className="card-desc">
                                        <span className="card-span"
                                        ><i className="fa-solid fa-bed-front"></i>{item.bedrooms}</span>
                                        <span className="card-span"
                                        ><i className="fa-solid fa-expand"></i>{item.area}</span>
                                        <span className="card-span"><i className="fa-solid fa-bath"></i>{item.bathrooms} م/2</span>
                                    </div>
                                    <div className="card-item-name">{item.title} </div>
                                    <div className="card-place">{item.address}</div>
                                    {
                                        item.price ?
                                            <div className="item-price">
                                                يبدأ من  {item.price} <span> {item.currencyName} </span>
                                                <span className="period"><span> / </span> لليلة الواحــــدة</span>
                                            </div>
                                            :
                                            null
                                    }
                                </Link>
                                <Link to={`https://wa.me/${data?.whatsapp ? data.whatsapp : ""}?text=اريد مناقشتكم حول ${item.title}`} className='card-content'>تواصل الآن واحصل علي عرض سعر</Link>
                            </motion.div>
                        )
                    }

                </div>

            </div>
        </section >
    )
}

export default PackageHotels
