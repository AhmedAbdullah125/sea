import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from 'sonner';
import { toggleFavourates } from '../../pages/toggleFavourates';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';
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
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    return (
        <>
            {
                mainData.length > 0 ?
                    <div className="grid-cont">
                        {
                            mainData.map((item, index) =>

                                <div className="card-item" key={index}>
                                    <Link to={`/hotel?id=${item.slug}`} className="related-item block">
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
                                                <span>{Number(item.discount)}%</span>
                                                <button

                                                    onClick={
                                                        () => {
                                                            if (sessionStorage.getItem('token')) {
                                                                if (lovedHotels.includes(item.id)) {
                                                                    setLovedHotels(lovedHotels.filter(id => id !== item.id))
                                                                    localStorage.setItem('lovedHotels', JSON.stringify(lovedHotels.filter(id => id !== item.id)))
                                                                }
                                                                else {
                                                                    setLovedHotels([...lovedHotels, item.id])
                                                                    localStorage.setItem('lovedHotels', JSON.stringify([...lovedHotels, item.id]))
                                                                }
                                                                toggleFavourates(item.id, 'Hotel');
                                                            }
                                                            else {
                                                                toast.error('يجب تسجيل الدخول اولا')
                                                                window.location.href = '/login'
                                                            }
                                                        }
                                                    }
                                                ><i className={`fa-heart ${lovedHotels.includes(item.id) ? 'fa-solid text-[#A71755]' : 'fa-regular '}`}></i></button>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to={`/hotel?id=${item.slug}`} className="card-content">
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
                                        {
                                            item.price ?
                                                <div className="item-price">
                                                    يبدأ من  {item.price} <span> {item.currencyName} </span>
                                                    <span className="period"><span> / </span> لليلة الواحــــدة</span>
                                                </div>
                                                :
                                                <Link to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم حول ${item.title}`}>تواصل الآن واحصل علي عرض سعر</Link>
                                        }
                                    </Link>
                                </div>
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
