import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/apiConfig";
import Loading from "../components/loading/Loading";
export default function Favourates() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
                            <p className="mb-3">يمكنك متابعة كل العناصر المفضلة من هنا</p>
                            <div className="related-grid-cont-favourates">
                                {
                                    data.map((item, index) =>
                                        item?.type == "Hotel" ?
                                            <div className="card-item" key={index}>
                                                <div className="related-item">

                                                    <figure>
                                                        <img src={item?.item.images[0]} alt="img" />
                                                    </figure>

                                                    {
                                                        item?.item.discount ?
                                                            <div className="related-content">
                                                                <div className="related-btn">
                                                                    <span>{Number(item.item.discount)}%</span>
                                                                </div>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                                <a href={`/hotel?id=${item.item.id}`} className="card-content">
                                                    <div className="detail-info-item rate">
                                                        <i className="fa-solid fa-star"></i>
                                                        <span>{Number(item.item.rating).toFixed(1)} <span>( {item.item.likes} )</span></span>
                                                    </div>
                                                    {
                                                        item.item.bedrooms &&
                                                        <div className="card-desc">
                                                            <span className="card-span"><i className="fa-solid fa-bed-front"></i>{item.item.bedrooms}</span>
                                                            <span className="card-span"><i className="fa-solid fa-expand"></i>{item.item.area}</span>
                                                            <span className="card-span"><i className="fa-solid fa-bath"></i>{item.item.bathrooms} م/2</span>
                                                        </div>
                                                    }
                                                    <div className="card-item-name">{item.item.title} </div>
                                                    <div className="card-place">{item.item.address}</div>
                                                    <div className="item-price">
                                                        يبدأ من {item.item.price} <span className="icon-saudi_riyal"></span>
                                                        <span className="period"><span>/</span> لليلة الواحــــدة</span>
                                                    </div>
                                                </a>
                                            </div>
                                            : item.type == "Plan" ?
                                                <div className="trip-item" key={index}>
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
                                                </div>
                                                :null
                                    )
                                }
                            </div>
                        </div>


            }
        </div>
    )
}
