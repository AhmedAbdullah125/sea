import React from 'react'
import ticketimg from '../../assets/ticket.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const AboutPlace = () => {
    return (
        <section className="about-place-section">
            <div className="container">
                <div className="about-p">
                    <h3>نبــذة عن المــكان</h3>
                    <p>رقم تصريح وزارة السياحة: 50005305. شقة فندقية بأجواء مريحة في شمال الرياض حي التعاون هادئ و جميل، تي في ٦٥ بوصة سامسونج نتفليكس و شاهد و جميع التطبيقات متاحة.تحتوي على ضيافة قهوة و ماء و مجهزة بجميع ادوات الاستحمام. تبعد مشي ٣ دقائق عن مجمع ريفر ووك مطاعم و كوفيهات، و دقيقتين مشي عن طريق ابو بكر، تبعد ٢٠ دقيقة عن المطار، صممت لتجد فيها راحتك. أتمنى لك إقامة سعيدة..</p>
                </div>
                <div className="about-grid">
                    <div className="grid-item">
                        <LazyLoadImage src={ticketimg} alt="logo" loading='lazy' />
                        <h4>كود ســــي SEA</h4>
                        <span>#100001</span>
                    </div>
                    <div className="grid-item">
                        <LazyLoadImage src={ticketimg} alt="logo" loading='lazy' />
                        <h4>كود ســــي SEA</h4>
                        <span>#100001</span>
                    </div>
                    <div className="grid-item">
                        <LazyLoadImage src={ticketimg} alt="logo" loading='lazy' />
                        <h4>كود ســــي SEA</h4>
                        <span>#100001</span>
                    </div>
                </div>
            </div>

        </section>


    )
}

export default AboutPlace
