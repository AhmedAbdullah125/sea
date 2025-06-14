import React from 'react'
import ticketimg from '../../assets/ticket.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const AboutPlace = ({ data }) => {
    return (
        <section className="about-place-section">
            <div className="container">
                <div className="about-p">
                    <h3>نبــذة عن المــكان</h3>
                    <p>{data.introductionToThePlace}</p>
                </div>
                <div className="about-grid">
                    {
                        data.eventItems.map((item, index) => (
                            <div className="grid-item" key={index}>
                                <LazyLoadImage src={ticketimg} alt="logo" loading='lazy' />
                                <h4>{item.title}</h4>
                                <span>{item.description}</span>
                            </div>
                        ))
                    }


                </div>
            </div>

        </section>


    )
}

export default AboutPlace
