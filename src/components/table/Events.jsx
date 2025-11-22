import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useGetActivities } from '../global/useGetActivities';
import Loading from '../loading/Loading';
const Events = ({ selectedCountry, selectedCity, countryName, cityName }) => {
    const { data, isLoading } = useGetActivities(selectedCountry, selectedCity);
    const [cats, setCats] = useState([]);
    const [seletedCat, setSeletedCat] = useState(null);
    useEffect(() => {
        if (!data) return;
        let arr = [];
        data.forEach((item) => {
            console.log(item);

            if (!arr.some(cat => cat.id === item.categoryId)) {
                arr.push({ id: item.categoryId, name: item.categoryName });
            }
        });
        setCats(arr);
    }, [data]);
    console.log(data);


    return (
        <>
            {
                isLoading ? <Loading /> :
                    <section className="places-section">
                        <div className="container">
                            <div className="section-header-cont">
                                <h2 className="section-title">الأنشطة في {cityName ? cityName : countryName?countryName:"تركـــــيا"}..</h2>
                            </div>
                            <div className="places-type">
                                <span onClick={() => setSeletedCat(null)} className={seletedCat === null ? "active-cat" : ""}>الكل</span>
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
                                                    <span className="places-name">{item?.city || "اسطنبول"}</span>
                                                    <span className="places-info">{parse(item?.title)}</span>
                                                </div>
                                                <figure>
                                                    <img src={item?.image} alt="img" />
                                                    <span className="places-status">{item?.isActive ? "متـــاح" : "غير متاح"}</span>
                                                </figure>
                                            </div>
                                            : null
                                    )
                                }

                            </div>
                        </div>
                    </section>
            }
        </>
    )
}

export default Events
