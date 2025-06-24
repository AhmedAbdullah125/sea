import React, { useState } from 'react'
const EventRateForm = () => {
    const [rate, setRate] = useState(0)
    function handleSubmit(e) {
        console.log(e);

    }
    return (
        <section className="event-form-section">
            <div className="event-form">
                <form action="" onSubmit={handleSubmit}>
                    <div className="title-rate">
                        <h3>قيم تجربتــك معنا </h3>
                        <div className="rate">
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <i className={`fa-solid fa-star ${index + 1 <= rate ? 'active' : ''}`} key={index} onClick={() => setRate(index + 1)}></i>
                                ))
                            }
                        </div>
                    </div>
                    <p>خلي غيــرك يستفيد من تجربــك...</p>
                    <textarea name="" id="" cols="30" rows="10" placeholder="أكتب هنا..."></textarea>
                    <button type='submit' className='btn-event'>حفظ الان</button>
                </form>
            </div>
        </section>


    )
}

export default EventRateForm
