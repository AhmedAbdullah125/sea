import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/apiConfig";
import Loading from "../components/loading/Loading";
import waImage from '../assets/wa.svg'


export default function Favourates() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [settings, setSettings] = useState([]);
    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        //if not login redirect to login
        if (!sessionStorage.getItem('token')) {
            toast.error('لم يتم تسجيل الدخول')
            window.location.href = '/login';
        }
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/wishlist`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
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
    useEffect(() => {
        const getSettings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`, {});
                setSettings(response.data.data);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }

        }
        getSettings();
    }, [])
    function formatArabicDate(dateStr) {
        const date = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(date);
    }
    const t = { "hotels": "الفنادق", "plans": "الباقات" }
    const [selectedHotels, setSelectedHotels] = useState([]);
    return (
        <div className="reservation-cont">
            {
                loading ? <Loading /> :
                    data.length == 0 ?
                        <div className="no-reservation">
                            <h2>لا يوجد عناصر مفضله</h2>
                            <p>يمكنك متابعة كل العناصر المفضلة من هنا</p>
                        </div>
                        :
                        <div className="no-reservation">
                            <h2>المفضلة</h2>
                            <p className="mb-6">يمكنك متابعة كل العناصر المفضلة من هنا</p>
                            {
                                data.map((item, index) =>
                                    <div className="mb-10" key={index}>
                                        {/* using t translate type */}
                                        <div className="flex items-center justify-between mb-5 gap-2">
                                            <h3 className="">{t[item.type]}</h3>
                                            {
                                                selectedHotels.length > 1 && item.type == "hotels" && settings ?
                                                    <a className="btn-wa max-w-56" href={`https://wa.me/${settings.whatsapp}?text=  اريد مناقشتكم عن مقارنه بين الفنادق ${selectedHotels.map(item => item).join(', ')}`}>
                                                        <span>
                                                            قارن الفنادق المحددة
                                                        </span>
                                                        <img src={waImage} alt="whatsapp" />
                                                    </a>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="related-grid-cont-favourates">
                                            {
                                                item.type == "hotels" ?
                                                    item.items.map((hotel, index) =>
                                                        <div className="card-item" key={index}>
                                                            <div className="related-item">

                                                                <figure className="fav-img-cont">
                                                                    {
                                                                        item.items.length > 1 ?
                                                                            <div className={`check-box ${selectedHotels.includes(hotel.title) ? "active" : ""}`} onClick={() => {
                                                                                selectedHotels.includes(hotel.title) ? setSelectedHotels(selectedHotels.filter(item => item !== hotel.title))
                                                                                    :
                                                                                    setSelectedHotels([...selectedHotels, hotel.title])
                                                                            }} data-id={`${hotel.title}`}>
                                                                                {
                                                                                    selectedHotels.includes(hotel.title) ?
                                                                                        <i className="fa-solid fa-check"></i>
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    <img src={hotel.images[0]} alt="img" />
                                                                </figure>

                                                                {
                                                                    hotel.discount ?
                                                                        <div className="related-content">
                                                                            <div className="related-btn">
                                                                                <span>{Number(hotel.discount)}%</span>
                                                                            </div>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                            <a href={`/hotel/${hotel.slug}`} className="card-content">
                                                                <div className="detail-info-item rate">
                                                                    <i className="fa-solid fa-star"></i>
                                                                    <span>{Number(hotel.rating).toFixed(1)} <span>( {hotel.likes} )</span></span>
                                                                </div>
                                                                {
                                                                    hotel.bedrooms &&
                                                                    <div className="card-desc">
                                                                        <span className="card-span"><i className="fa-solid fa-bed-front"></i>{hotel.bedrooms}</span>
                                                                        <span className="card-span"><i className="fa-solid fa-expand"></i>{hotel.area}</span>
                                                                        <span className="card-span"><i className="fa-solid fa-bath"></i>{hotel.bathrooms} م/2</span>
                                                                    </div>
                                                                }
                                                                <div className="card-item-name">{hotel.title} </div>
                                                                <div className="card-place">{hotel.address}</div>
                                                                <div className="item-price">
                                                                    يبدأ من {hotel.price} {hotel.currencyName}
                                                                    <span className="period"><span>/</span> لليلة الواحــــدة</span>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )
                                                    :
                                                    item.items.map((trip, index) =>
                                                        <div className="trip-item" key={index}>
                                                            <div className="trip-img">
                                                                <figure>
                                                                    <img src={trip.thumbnail} alt="img" />
                                                                </figure>

                                                            </div>
                                                            <a href={`/package/${trip.slug}`} className="card-content">
                                                                <div className="detail-flex">
                                                                    <div className="detail-period">جولة لمدة {trip.durationDays} أيــــام</div>
                                                                    <div className="detail-info-item rate">
                                                                        <i className="fa-solid fa-star"></i>
                                                                        <span>{Number(trip.rating).toFixed(1)} <span>( {trip.reviewsCount} )</span></span>
                                                                    </div>
                                                                </div>
                                                                <div className="card-item-name">{trip.title}</div>
                                                                <div className="card-place">سارية في {formatArabicDate(trip.arrivalTime)}</div>
                                                                <div className="item-price">
                                                                    {trip.cost}
                                                                    {trip.currencyName}
                                                                    <span className="period"><span>/</span> للشخص الواحد</span>
                                                                </div>

                                                            </a>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>


            }
        </div>
    )
}
