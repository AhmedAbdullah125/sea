import React from 'react'
import img1 from '../../assets/detail.jpg'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
const PackageHeader = () => {
    return (
        <section className="content-section">
            <div className="container">
                <h2 className="detail-title">بـــاقة مدريــــــد - برشلـــونة</h2>
                <div className="detail-time">03 أيـــــــــام</div>
                <div className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>5.0 <span>( 500+ )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-bullseye"></i>
                            <span>رحلة لمـــــدة 03 ليــــــــالي</span>
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
                    {[...Array(5)].map((_, idx) => (
                        <div className="detail-box" key={idx}>
                            <figure className="detail-img">
                                <img src={img1} className="img-fluid" alt="detail-img" />
                            </figure>
                            {idx === 0 && (
                                <div className="detail-img-btn">
                                    <button className="add-btn">
                                        <img src={imgicon1} alt="icon" />
                                    </button>
                                    <button className="add-btn">
                                        <img src={imgicon2} alt="icon" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PackageHeader
