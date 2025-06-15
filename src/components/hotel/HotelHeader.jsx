import React , { useState } from 'react'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
const HotelHeader = ({ data }) => {
    const [selectedImg, setselectedImg] = useState(data.images[0])
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
                        <button className="add-btn">
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                        <button className="add-btn"><i className="fa-regular fa-heart"></i></button>
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
