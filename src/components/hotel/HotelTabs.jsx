import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser';

const HotelTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);
    const latitude = data.latitude
    const longitude = data.longitude;

    return (
        <section className='hotel-tabs-section'>
            <div className="controllers">
                <span className={activeTab === 0 ? "active" : ""} onClick={() => setActiveTab(0)}>الوصـــــف</span>
                <span className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>المواصفات والميزات</span>
                <span className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>تقييمات الضيوف</span>
                <span className={activeTab === 3 ? "active" : ""} onClick={() => setActiveTab(3)}>الموقع والخريطة</span>

            </div>
            <div className="descrip">
                {
                    activeTab === 0 && <p className='description-text'>
                        {parse(data.description)}
                    </p>
                }
                {
                    activeTab === 1 && <div className="advantages">
                        {
                            data.advantages.map((item, idx) => (
                                <div className="advantage" key={idx}>
                                    <i className="fa-solid fa-check"></i>
                                    <span>{item}</span>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    activeTab === 2 && 
                    <div className="comments">
                        {
                            data.commnets.map((item, idx) => (
                                <div className="comment">
                                    <div className="comment-head">
                                        {/* first letter of the name */}
                                        <span className='first-letter'>{item?.name?.slice(0, 1)}</span>
                                        <span>{item.name}</span>

                                    </div>
                                    <div className="comment-body">
                                        <p>{item.comment}</p>
                                    </div>
                                    <div className="dets">
                                        <span className='date'>{item.created_at}</span>
                                        <span className='rating'> {item.rating}/5 <i className="fa-solid fa-star"></i>   </span>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                }
                {
                    activeTab === 3 && <p>
                        
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=ar&z=14&output=embed`}
                        />

                    </p>
                }
            </div>
        </section>
    )
}

export default HotelTabs
