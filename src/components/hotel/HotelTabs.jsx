import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser';
import HotelRateForm from './HotelRateForm';

const HotelTabs = ({ data, trigger, setTrigger }) => {
    const [activeTab, setActiveTab] = useState(0);
    const latitude = data.latitude
    const longitude = data.longitude;
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(null);
    const formatter = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
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
                    <>
                        <div className="comments">
                            {
                                data.commnets.map((item, idx) => (
                                    <div className="comment">
                                        <div className="comment-head">
                                            {/* first letter of the name */}
                                            <span className='first-letter'>{item?.name?.slice(0, 1)}</span>
                                            <span>{item.name}</span>

                                        </div>
                                        <p className="comment-body">{item.comment}</p>
                                        <div className="dets">
                                            <span className='date'>{formatter.format(new Date(item.created_at))}</span>
                                            <span className='rating'> {item.rating}/5 <i className="fa-solid fa-star"></i>   </span>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                        <HotelRateForm comment={comment} rate={rate} setComment={setComment} data={data} setRate={setRate} trigger={trigger} setTrigger={setTrigger}  activeTab={activeTab} setActiveTab={setActiveTab}/>
                    </>
                }
                {
                    activeTab === 3 &&
                    <div className="map-cont">
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=ar&z=14&output=embed`}
                        />

                    </div>

                }
            </div>
        </section>
    )
}

export default HotelTabs
