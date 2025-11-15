import React, { useState, useEffect } from 'react'
import plane from '../../../public/app/plane-icon.svg'
import { toast } from 'sonner';
import { toggleFavourates } from '../../pages/toggleFavourates';
import {motion} from "framer-motion";
import { useGetSettings } from '../global/useGetSettings';
const PackagesGrid = ({ mainData }) => {
    const { data, isLoading, isError } = useGetSettings();

    const [lovedPlans, setLovedPlans] = useState(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedPlans')) {
                setLovedPlans(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : []);
            }
            else {
                localStorage.setItem('lovedPlans', []);
            }
        }
    }, [data])
 
    function formatArabicDate(dateStr) {
        const date = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(date);
    }

    return (
        <section className="content-section">
            <div className="grid-cont">

                {
                    mainData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }} className="trip-item" key={index}>
                            <a href={`package/${item.slug}`} className="card-content" style={{padding:"0px"}}>
                                <div className="trip-img">
                                    <figure>
                                        <img src={item.thumbnail} alt="img" />
                                    </figure>
                                    <button className="fav-btn" onClick={
                                        () => {
                                            if (sessionStorage.getItem('token')) {
                                                if (lovedPlans.includes(item.id)) {
                                                    setLovedPlans(lovedPlans.filter(id => id !== item.id))
                                                    localStorage.setItem('lovedPlans', JSON.stringify(lovedPlans.filter(id => id !== item.id)))
                                                }
                                                else {
                                                    setLovedPlans([...lovedPlans, item.id])
                                                    localStorage.setItem('lovedPlans', JSON.stringify([...lovedPlans, item.id]))
                                                }
                                                toggleFavourates(item.id, 'Plan');
                                            }
                                            else {
                                                toast.error('يجب تسجيل الدخول اولا')
                                                window.location.href = '/login'
                                            }
                                        }
                                    }
                                    >
                                        <i className={` fa-heart ${lovedPlans.includes(item.id) ? 'fa-solid text-[#a71755]' : 'fa-regular'}`}></i>
                                    </button>
                                </div>

                                <div className="detail-flex">
                                    <div className="detail-period">جولة لمدة {item.durationDays} أيــــام</div>
                                    <div className="detail-info-item rate">
                                        <i className="fa-solid fa-star"></i>
                                        <span>{Number(item.rating).toFixed(1)} <span>( {item.reviewsCount} )</span></span>
                                    </div>
                                </div>
                                <div className="card-item-name">{item.title}</div>
                                <div className="card-place">سارية في {formatArabicDate(item.arrivalTime)}</div>
                                <div className="item-price">
                                    {item.cost} {item.currencyName}  <span className="period"><span> / </span> للشخص الواحد </span>
                                </div>
                                <div className="item-btn">
                                    <a href={`https://wa.me/${data.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-ancor">احجـــز رحلتك الآن</a>
                                    <a href={`https://wa.me/${data.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-flight"><img src={plane} alt="icon" /></a>
                                </div>
                            </a>
                        </motion.div>
                    ))
                }
            </div>
        </section>
    )
}

export default PackagesGrid
