import React, { useEffect, useState } from 'react'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
import { toast } from 'sonner'
const HotelHeader = ({ data }) => {
    const [selectedImg, setselectedImg] = useState(data.images[0])
    const [lovedHotels ,setLovedHotels] = useState(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : [] )
    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (localStorage.getItem('lovedHotels')) {
            setLovedHotels(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : []);
          }
          else {
            localStorage.setItem('lovedHotels', []);
          }
        }
      },[data])
    return (
        <section className="content-section">
            <div className="container">
                <h2 className="detail-title">{data.title}</h2>
                <span>كود الوحدة ( {data.code} ) </span>
                <div className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data.rating).toFixed(1)} <span>( {data.reviewsCount} )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{data.address}</span>
                        </div>

                        <div className="detail-info-item">
                            <i className="fa-solid fa-location-crosshairs"></i>
                            <span>مساحة الوحدة {data.area} م²</span>
                        </div>

                        <div className="detail-info-item">
                            <i className="fa-solid fa-users"></i>
                            <span>مخصص لعوائل وعزاب</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
                        {/* make button copy the path of this site */}
                        <button className="add-btn" onClick={() => {
                            toast.success('تم نسخ الرابط')
                            navigator.clipboard.writeText(window.location.href)
                        }}>
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                        {/* make button adding id of hotel to localstorage if it not exist and remove it if it exist */}
                        <button className="add-btn"
                        onClick={() => {
                            if (lovedHotels.includes(data.id)) {
                                setLovedHotels(lovedHotels.filter(id => id !== data.id))
                                localStorage.setItem('lovedHotels', JSON.stringify(lovedHotels.filter(id => id !== data.id)))
                                toast.success('تم حذف الوحدة من المفضلة')
                            }
                            else {
                                setLovedHotels([...lovedHotels, data.id])
                                localStorage.setItem('lovedHotels', JSON.stringify([...lovedHotels, data.id]))
                                toast.success('تم اضافة الوحدة الي المفضلة')
                            }
                        }}
                        ><i className={`fa-heart ${lovedHotels.includes(data.id) ? 'fa-solid text-[#A71755]' : 'fa-regular'}`}></i></button>
                    </div>
                </div>
                <div className="detail-cont">
                    <div className="detail-box">
                        <figure className="detail-img">
                            <img src={selectedImg} className="img-fluid" alt="detail-img" />
                        </figure>
                        <div className="detail-img-btn">
                            <button className="add-btn">
                                <img src={imgicon1} alt="icon" />
                            </button>
                            <button className="add-btn">
                                <img src={imgicon2} alt="icon" />
                            </button>
                        </div>
                    </div>
                    {data.images.map((img, idx) => (
                        <div className="detail-box" key={idx}>
                            <figure className="detail-img" onClick={() => setselectedImg(img)}>
                                <img src={img} className="img-fluid" alt="detail-img" />
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HotelHeader
