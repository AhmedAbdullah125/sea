import React, { useState } from 'react'
import { toast } from 'sonner';
import { addEventComment } from './addEventComment';
import { API_BASE_URL } from '../../lib/apiConfig';
import Loading from '../loading/Loading';
const EventRateForm = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    function handleSubmit(e) {
        e.preventDefault(); // ✅ Prevent page reload
        if(!sessionStorage.getItem('token')){
            toast.error('يرجى تسجيل الدخول قبل الحفظ');
            return
        }
        if (rate === 0) {
            toast.error('يرجى تحديد التقييم قبل الحفظ');
            return;
        }

        const payload = {
            comment,
            rate,
            // Optionally attach data like hotel ID or user ID
            id,
        };
        handleAddComment(payload);
        // console.log(payload);
          // reset form fields
          setComment('');
          setRate(0);
    }
    const handleAddComment = async (payload) => {
        await addEventComment(API_BASE_URL, payload, setLoading, );
    };
    return (
        <section className="event-form-section">
        {
            loading ? <Loading /> :
                <div className="event-form">
                    <form onSubmit={handleSubmit}>
                        <div className="title-rate">
                            <h3>قيّم تجربتــك معنا</h3>
                            <div className="rate">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <i key={index} className={`fa-solid fa-star ${index + 1 <= rate ? 'active' : ''}`} onClick={() => setRate(index + 1)} style={{ cursor: 'pointer' }}></i>
                                ))}
                            </div>
                            
                        </div>
                        <p>خلي غيرك يستفيد من تجربتك...</p>
                        <textarea cols="30" rows="10" placeholder="أكتب هنا..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                        <button type="submit" className="btn-event">حفظ الآن</button>
                    </form>
                </div>
        }
    </section>


    )
}

export default EventRateForm
