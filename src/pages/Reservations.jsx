import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/apiConfig";
import Loading from "../components/loading/Loading";
export default function Reservations() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [transport, setTransport] = useState([]);

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
                const response = await axios.get(`${API_BASE_URL}/bookings/booking-travel-visa`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                const response2 = await axios.get(`${API_BASE_URL}/bookings/transport`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                const response3 = await axios.get(`${API_BASE_URL}/bookings/hotel`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                setData(response.data.data);
                setTransport(response2.data.data);
                setHotels(response3.data.data);
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
                    data.length == 0 && transport.length == 0 && hotels.length == 0 ? <div className="no-reservation">
                        <h2>لا يوجد حجوزات سابقة</h2>
                        <p>يمكنك متابعة كل حجوزاتك من هنا</p>
                    </div> :
                        <span>ss</span>

            }
        </div>
    )
}
