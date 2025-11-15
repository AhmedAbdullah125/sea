import flatsImg from '../../../public/app/flats.svg'
import villasImg from '../../../public/app/villas.svg'
import woodenImg from '../../../public/app/wooden.svg'
import hostingImg from '../../../public/app/hosting.svg'
import { useState } from 'react'
const HouseType = ({ formData, setFormData }) => {

    const data = [
        {
            img: flatsImg,
            title: "شقق فندقيــة",
            text: "قدّم إقامة مريحة بخدمات فندقية مميزة.",
            value: "flat"
        },
        {
            img: villasImg,
            title: "فلل وشــاليهــات",
            text: "استمتع بتأجير راقٍ لإقامة فاخرة مريحة.",
            value: "villa"
        },
        {
            img: woodenImg,
            title: "أكــواخ خشبيــة",
            text: "وفّر تجربة طبيعية دافئة وسط الهدوء.",
            value: "wooden"
        },
        {
            img: hostingImg,
            title: "دار ضيــافــة",
            text: "استقبل ضيوفك وحقق دخلًا من سكنك.",
            value: "hosting"
        }
    ]

    return (
        <div className="house-type">
            <h2>أخبــرنــا عن سكنـــك !.</h2>
            <p>ابدأ بإدخال معلومات أساسية عن نوع سكنك، صورته الخارجية، مع حالته وموقعه.</p>
            <div className="typs-grid" >
                {
                    data.map((item, index) => (
                        <div className={`typs-item ${formData.type === item.value ? "active-item" : ""}`} key={index} onClick={() => setFormData({ ...formData, type: item.value })}>
                            <div className="arr-cont">
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                            <div className="img-cont">
                                <img src={item.img} alt="flats" />
                            </div>
                            <h3>{item.title}</h3>
                            <span>{item.text}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HouseType
