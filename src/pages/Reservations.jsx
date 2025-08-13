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

                                        <a href={`/hotel/${item.slug}`} className="card-content">
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
                            </div>
                        </div>

            }
        </div>
    )
}
