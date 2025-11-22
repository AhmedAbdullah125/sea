import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { toast } from 'sonner';
import { toggleFavourates } from '../../pages/toggleFavourates';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useGetSettings } from '@/components/global/useGetSettings';
import { useGetCities } from "../global/useGetCities";
import Loading from "../loading/Loading";

const HotelsGrid = ({ isFilterOpen, mainData, mainSelectedCity, setMainSelectedCity }) => {
    const { data } = useGetSettings();
    const { data: cities, isLoading } = useGetCities()
    const swiperRef = useRef(null); // <-- Add ref to control Swiper autoplay
    return (
        <>
            {
                isLoading ? <Loading /> :
                    isFilterOpen ? null :
                        <>
                            <div className="relative cities-section" id='big-offers'>
                                <div className="text">
                                    <h2>في كل وجهـــة… لك عنـــوان يرحّـــب فيـــك !.</h2>
                                    <p>كل مدينة… فيها زاوية تنادي باسمك ..</p>
                                </div>
                                <div className="swiper-btn-cont swiper-btn-2" id={`swiper-btn-prev1a`}>
                                    <div className="swiper-btn-prev swiper-btn">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </div>

                                    <div className="swiper-btn-next swiper-btn" id={`swiper-btn-next1a`}>
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="cities-swiper-cont">
                                <div
                                    onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                                    onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                                ></div>
                                <Swiper
                                    onSwiper={(swiper) => swiperRef.current = swiper} // <-- capture Swiper instance
                                    pagination={false}
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    loop={true}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    breakpoints={{
                                        2000: { slidesPerView: 9 },
                                        1400: { slidesPerView: 7 },
                                        1024: { slidesPerView: 5 },
                                        768: { slidesPerView: 4 },
                                        640: { slidesPerView: 3 },
                                        320: { slidesPerView: 2 },
                                        100: { slidesPerView: 2 },
                                    }}
                                >
                                    {
                                        cities?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: -30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                    className="city-card cursor-pointer"
                                                    onClick={() => setMainSelectedCity(item.id)}
                                                >
                                                    <img src={item.image} alt="img" />
                                                    <div className="overlay">
                                                        <h2 className="ma-3 text-sm font-semibold">{item.name}</h2>
                                                        <p className="text-xs font-normal">{item.descripton}</p>
                                                    </div>
                                                </motion.div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>

                            <h2 className="my-6 text-2xl font-bold text-main-blue">اكتشف الخيارات المميزة والعروض اليومية.</h2>
                        </>
            }

            {
                mainData?.data?.length > 0 ?
                    <div className="grid-cont">

                        {
                            mainData?.data.map((item, index) =>

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
                                            <span>{item?.tate_name ? item?.tate_name : "0"} <span>( {item?.likes ? item?.likes : "0"} )</span></span>
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
                    :
                    <p className='text-center p-3 rounded-xl bg-[#A71755] w-full text-white bottom-1 border-main-navy'>لا توجد فنادق بهذا الوصف </p>
            }
        </>
    )
}

export default HotelsGrid
