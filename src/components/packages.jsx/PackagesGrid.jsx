import React, { useState, useEffect } from 'react'
import plane from '../../assets/housing/plane-icon.svg'
import hotel1 from '../../assets/hotels/1.png'
import hotel2 from '../../assets/hotels/2.png'
import hotel3 from '../../assets/hotels/3.png'
import hotel4 from '../../assets/hotels/4.png'
import hotel5 from '../../assets/hotels/5.png'
import hotel6 from '../../assets/hotels/6.png'
import hotel7 from '../../assets/hotels/7.png'
import hotel8 from '../../assets/hotels/8.png'
const PackagesGrid = ({ mainData }) => {
    console.log(mainData);
    
    const hotels = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8]
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, [])
    console.log(data);
    function formatArabicDate(dateStr) {
        const date = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('ar-EG', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return formatter.format(date);
      }
    
    return (
        <section className="content-section">
            <div className="grid-cont">

                {
                    mainData.map((item, index) => (
                        <div className="trip-item" key={index}>
                            <div className="trip-img">
                                <figure>
                                    <img src={item.thumbnail} alt="img" />
                                </figure>
                                <button className="fav-btn">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                            <a href={`package?id=${item.id}`} className="card-content">
                                <div className="detail-flex">
                                    <div className="detail-period">جولة لمدة {item.durationDays} أيــــام</div>
                                    <div className="detail-info-item rate">
                                        <i className="fa-solid fa-star"></i>
                                        <span>{Number(item.rating).toFixed(1)} <span>( {item.reviewsCount} )</span></span>
                                    </div>
                                </div>
                                <div className="card-item-name">{item.title}</div>
                                <div className="card-place">سارية في {formatArabicDate(item.arrivalTime)}</div>
                                <div className="item-price">
                                     {item.cost}
                                    <span className='icon-saudi_riyal'></span>
                                    <span className="period"><span>/</span> للشخص الواحد</span>
                                </div>
                                <div className="item-btn">
                                    <a href={`https://wa.me/${data.whatsapp}?text= مناقشتكم لإضافه لحجز الباقه `} className="book-ancor">إحجـــز رحلتك الان</a>
                                    <a href="#" className="book-flight"
                                    ><img src={plane} alt="icon"
                                        /></a>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PackagesGrid
