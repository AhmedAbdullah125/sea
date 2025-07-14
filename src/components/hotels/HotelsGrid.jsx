import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from 'sonner';
const HotelsGrid = ({ mainData }) => {
    const [lovedHotels, setLovedHotels] = useState(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedHotels')) {
                setLovedHotels(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : []);
            }
            else {
                localStorage.setItem('lovedHotels', []);
            }
        }
    }, [mainData])
    return (
        <div className="grid-cont">
            {
                mainData.map((item, index) =>

                    <div className="card-item" key={index}>
                        <div className="related-item">
                            <Swiper
                                pagination={{ clickable: true }}
                                spaceBetween={0}
                                navigation={{
                                    nextEl: `#swiper-btn-next1a`,
                                    prevEl: `#swiper-btn-prev1a`,
                                }}
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
                                    <span>{Number(item.discount)}%</span>
                                    <button
                                        onClick={() => {
                                            if (lovedHotels.includes(item.id)) {
                                                setLovedHotels(lovedHotels.filter(id => id !== item.id))
                                                localStorage.setItem('lovedHotels', JSON.stringify(lovedHotels.filter(id => id !== item.id)))
                                                toast.success('تم حذف الوحدة من المفضلة')
                                            }
                                            else {
                                                setLovedHotels([...lovedHotels, item.id])
                                                localStorage.setItem('lovedHotels', JSON.stringify([...lovedHotels, item.id]))
                                                toast.success('تم اضافة الوحدة الي المفضلة')
                                            }
                                        }}
                                    ><i className={`fa-heart ${lovedHotels.includes(item.id) ? 'fa-solid text-[#A71755]' : 'fa-regular '}`}></i></button>
                                </div>
                            </div>
                        </div>
                        <a href={`hotel?id=${item.id}`} className="card-content">
                            <div className="detail-info-item rate">
                                <i className="fa-solid fa-star"></i>
                                <span>{Number(item.rating).toFixed(1)} <span>( {item.likes} )</span></span>
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
                            <div className="item-price">
                                يبدأ من {item.price} <span className="icon-saudi_riyal"></span>
                                <span className="period"><span>/</span> لليلة الواحــــدة</span>
                            </div>
                        </a>
                    </div>
                )}
        </div>
    )
}

export default HotelsGrid
