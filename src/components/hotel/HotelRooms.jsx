
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/apiConfig";
import { Link } from "react-router-dom";
import waImage from '../../assets/wa.svg'

const HotelRooms = ({ data }) => {
    const [settings, setSettings] = useState([]);
    useEffect(() => {
        //getting settings from api
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`);
                setSettings(response.data.data);
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };
        getData();
    }, []);
    return (
        <section className="hotel-room">
            {
                data.rooms.length > 0 ?
                    <div className="container">
                        <div className="room-head">
                            <h3>الغـــرف !.</h3>
                            <h2>حدد خيار الغرفة الأنسب لك !.</h2>
                            <h4>قد تكون هذه الغرف ممتعةً لك !</h4>
                        </div>
                        <div className="rooms-grid">
                            {data.rooms.map((room, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="room-item"
                                    key={index}
                                >
                                    <div className="img-cont">
                                        <div className="overlay"></div>
                                        {
                                            room.numberOfBeds > 1 ? <span className="beds"> إجمــــالي الضيـوف : {room.numberOfBeds}  </span> : null
                                        }
                                        <img src={room.image} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="features">
                                            {
                                                room.features.map((feature) => (
                                                    <div key={feature.id} className="feature">
                                                        <img src={feature.icon} alt="room feature" />
                                                        <span>{feature.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <h3 className="room-name">{room.name}</h3>
                                        {
                                            room.childBedEnabled ? <span className="child-bed">أسرة أطفال / رضع مجانًا</span> : null
                                        }
                                        <div className="details">
                                            <div className="r-side">
                                                <div className="price">
                                                    <span>{Number(room.price).toFixed(1)}</span>
                                                    <span className="currency">{data.currencyName}</span>
                                                </div>
                                                <span className="price-per-night">المجموع ل (1) غرفة</span>
                                            </div>
                                            <div className="l-side">
                                                <div className="methods">
                                                    {
                                                        room.paymentMethods.map((method, index) => (
                                                            <img key={index} src={method.image} alt="payment method" />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Link className="btn-wa" to={`https://wa.me/${settings.whatsapp}?text=اريد مناقشتكم عن غرفة ${room.name} في ${data.title}`}>
                                        <span>تخصيص الغرفة</span>
                                        <img src={waImage} alt="whatsapp" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    : null
            }
        </section>
    )
}

export default HotelRooms
