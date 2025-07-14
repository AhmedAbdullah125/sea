import React, { useEffect, useState } from 'react'
import img1 from '../../assets/related.png'
import parse from 'html-react-parser'
const Events = ({ data }) => {
    const [cats, setCats] = useState([]);
    const [seletedCat, setSeletedCat] = useState(null);
    useEffect(() => {
        let arr = [];
        data.forEach((item) => {
            if (!arr.some(cat => cat.id === item.categoryId)) {
                arr.push({ id: item.categoryId, name: item.categoryName });
            }
        });
        setCats(arr);
    }, [data]);
    
    return (
        <section className="places-section">
            <div className="container">
                <div className="section-header-cont">
                    <h2 className="section-title">الأنشطة في إسطنبـــول..</h2>
                </div>
                <div className="places-type">
                    {
                        cats.map((item, idx) =>
                            <span key={idx} onClick={() => setSeletedCat(item.id)} className={seletedCat === item.id ? "active-cat" : ""}>{item.name}</span>
                        )
                    }
                </div>
                <div className="places-cont">
                    {
                        data.map((item, idx) =>
                            seletedCat === null || item.categoryId === seletedCat ?
                                <div className="places-item" key={idx}>
                                    <div className="places-content">
                                        <span className="place-type">{item.type}</span>
                                        <span className="places-name">{item.title}</span>
                                        <span className="places-info">{parse(item.description)}</span>
                                    </div>
                                    <figure>
                                        <img src={item.image} alt="img" />
                                        <span className="places-status">متـــاح</span>
                                    </figure>
                                </div>
                                : null
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default Events
