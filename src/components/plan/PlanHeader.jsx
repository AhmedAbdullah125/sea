import React, { useEffect, useState } from 'react'
import detailImg from '../../assets/detail.jpg'
import imgIcon1 from '../../assets/imgIcon-1.svg'
import imgIcon2 from '../../assets/imgIcon-2.svg'
import { toast } from 'sonner'

const PlanHeader = ({ data }) => {
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
    const [selectedImage, setSelectedImage] = useState(data.thumbnail)
    return (
        <section className="content-section">
            <div className="container">
                <h2 className="detail-title">{data.title}</h2>
                <div className="detail-time">{data.durationDays} أيـــــــــام</div>
                <div className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data.rating).toFixed(1)} <span>( {data.reviewsCount} )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-bullseye"></i>
                            <span>رحلة لمـــــدة {data.durationDays} ليــــــــالي</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
                        <button className="add-btn" onClick={() => {
                            toast.success('تم نسخ الرابط')
                            navigator.clipboard.writeText(window.location.href)
                        }}>
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                        <button className="add-btn"
                            onClick={() => {
                                if (lovedPlans.includes(data.id)) {
                                    setLovedPlans(lovedPlans.filter(id => id !== data.id))
                                    localStorage.setItem('lovedPlans', JSON.stringify(lovedPlans.filter(id => id !== data.id)))
                                    toast.success('تم حذف الوحدة من المفضلة')
                                }
                                else {
                                    setLovedPlans([...lovedPlans, data.id])
                                    localStorage.setItem('lovedPlans', JSON.stringify([...lovedPlans, data.id]))
                                    toast.success('تم اضافة الوحدة الي المفضلة')
                                }
                            }}
                        ><i className={` fa-heart ${lovedPlans.includes(data.id) ? 'fa-solid text-[#a71755]' : 'fa-regular'}`}></i></button>
                    </div>
                </div>
                <div className="detail-cont">
                    <div className="detail-box">
                        <figure className="detail-img">
                            <img src={selectedImage} className="img-fluid" alt="detail-img" />
                        </figure>
                        <div className="detail-img-btn">
                            <button className="add-btn">
                                <img src={imgIcon1} alt="icon" />
                            </button>
                            <button className="add-btn">
                                <img src={imgIcon2} alt="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="detail-box">
                        <figure className="detail-img" onClick={() => setSelectedImage(data.thumbnail)}>
                            <img src={data.thumbnail} className="img-fluid" alt="detail-img" />
                        </figure>
                    </div>
                    {
                        data.images.slice(0, 3).map((img, index) => (
                            <div className="detail-box" key={index}>
                                <figure className="detail-img" onClick={() => setSelectedImage(img)}>
                                    <img src={img} className="img-fluid" alt="detail-img" />
                                </figure>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default PlanHeader
