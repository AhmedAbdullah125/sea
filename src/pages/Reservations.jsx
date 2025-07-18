import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/apiConfig";
import Loading from "../components/loading/Loading";
export default function Reservations() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 

        window.scrollTo(0, 0);
        if (!sessionStorage.getItem('token')) {
            toast.error('لم يتم تسجيل الدخول')
            window.location.href = '/login';
        }
        const getData = async () => {
            try {

                const response = await axios.get(`${API_BASE_URL}/user/bookings`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                setData(response.data.data);

                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    console.log(data);
    return (
        <div className="reservation-cont">
            {
                loading ? <Loading /> :
                    data.length == 0 ? <div className="no-reservation">
                        <h2>لا يوجد حجوزات سابقة</h2>
                        <p>يمكنك متابعة كل حجوزاتك من هنا</p>
                    </div> :
                        <div className="no-reservation">
                            <h2>الحجوزات </h2>
                        <p className="mb-3">يمكنك متابعة كل حجوزاتك من هنا</p>
                            <div className="related-grid-cont-favourates">
                                {
                                    data.hotels.map((item, index) =>

                                        <a href={`/hotel?id=${item.hotel_id}`} className="card-content">
                                            <div className="card-item" key={index}>
                                                <div className="related-item mb-4">

                                                    <figure>
                                                        <img src={item?.images[0]} alt="img" />
                                                    </figure>


                                                    <div className="related-content">
                                                        <div className="related-btn">
                                                            <span>{item.is_paid ? 'مدفوعة' : 'غير مدفوعة'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h2>{item.hotelName} </h2>

                                            </div>
                                        </a>


                                    )
                                }
                                {/* <div className="trip-item" key={index}>
                                                <div className="trip-img">
                                                    <figure>
                                                        <img src={item.item.thumbnail} alt="img" />
                                                    </figure>

                                                </div>
                                                <a href={`/package?slug=${item.item.slug}`} className="card-content">
                                                    <div className="detail-flex">
                                                        <div className="detail-period">جولة لمدة {item.item.durationDays} أيــــام</div>
                                                        <div className="detail-info-item rate">
                                                            <i className="fa-solid fa-star"></i>
                                                            <span>{Number(item.item.rating).toFixed(1)} <span>( {item.item.reviewsCount} )</span></span>
                                                        </div>
                                                    </div>
                                                    <div className="card-item-name">{item.item.title}</div>
                                                    <div className="card-place">سارية في {formatArabicDate(item.item.arrivalTime)}</div>
                                                    <div className="item-price">
                                                        {item.item.cost}
                                                        <span className='icon-saudi_riyal'></span>
                                                        <span className="period"><span>/</span> للشخص الواحد</span>
                                                    </div>

                                                </a>
                                            </div> */}
                            </div>
                        </div>

            }
        </div>
    )
}
