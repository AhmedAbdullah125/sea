import React, { useState, useEffect } from 'react'
import plane from '../../assets/housing/plane-icon.svg'
import { toast } from 'sonner';
import { toggleFavourates } from '../../pages/toggleFavourates';
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';
const PackagesGrid = ({ mainData }) => {
    const [data, setData] = useState([])
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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
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
    }, [])
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
                        <div className="trip-item" key={index}>
                            <a href={`package?slug=${item.slug}`} className="card-content" style={{padding:"0px"}}>
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
                                    <a href={`https://wa.me/${data.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-ancor">إحجـــز رحلتك الان</a>
                                    <a href={`https://wa.me/${data.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-flight"><img src={plane} alt="icon" /></a>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PackagesGrid
