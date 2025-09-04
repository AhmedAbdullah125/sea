
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/apiConfig";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import waImage from '../../assets/wa.svg'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { toggleFavourates } from "../../pages/toggleFavourates";

const HotelRooms = ({ data }) => {
    const [favouratesRooms, setFavouratesRooms] = useState([])
    Fancybox.bind("[data-fancybox]", {
        dirction: "ltr",

    });
    Fancybox.bind("[data-fancybox-video]", {
        // Your custom options
    });
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
        // adding favourates rooms ids to favouratesRooms state
        let favs = []
        for (let index = 0; index < data.rooms.length; index++) {
            if (data.rooms[index].is_favourate) {
                favs.push(data.rooms[index].id)
            }

        }
        setFavouratesRooms(favs)
    }, []);
    console.log(data);
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
                                    className="room-item card-item"
                                    key={index}
                                >
                                    <div className="related-item block mb-5">
                                        <div className="related-content">
                                            <div className="related-btn">
                                                {/* <span>{Number(item.discount)}%</span> */}
                                                <button

                                                    onClick={
                                                        () => {
                                                            if (sessionStorage.getItem('token')) {
                                                                if (favouratesRooms.includes(room.id)) {
                                                                    setFavouratesRooms(favouratesRooms.filter(id => id !== room.id))
                                                                }
                                                                else {
                                                                    setFavouratesRooms([...favouratesRooms, room.id])
                                                                }
                                                                toggleFavourates(room.id, 'Room');
                                                            }
                                                            else {
                                                                toast.error('يجب تسجيل الدخول اولا')
                                                                window.location.href = '/login'
                                                            }
                                                        }
                                                    }
                                                ><i className={`fa-heart ${favouratesRooms.includes(room.id) ? 'fa-solid text-[#A71755]' : 'fa-regular '}`}></i></button>
                                            </div>
                                        </div>
                                        <Swiper
                                            pagination={{ clickable: true }}
                                            spaceBetween={0}
                                            navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
                                            slidesPerView={1}
                                            autoplay={false}
                                            //pause on mouse hoverx
                                            mousewheel={true}
                                            loop={true}
                                            modules={[Autoplay, Navigation, Pagination]}
                                            breakpoints={{
                                                1400: {
                                                    slidesPerView: 1,
                                                },

                                            }}
                                        >
                                            {
                                                room.image.map((img, index) => {
                                                    const isVideo = /\.(mp4|mov|webm)$/i.test(img);

                                                    return (
                                                        <SwiperSlide key={index}>
                                                            <figure className="img-cont">
                                                                <a data-fancybox="room" href={img} data-caption={room.name}>
                                                                    <div className="overlay"></div>
                                                                    {room.numberOfBeds > 1 && (
                                                                        <span className="beds">إجمــــالي الضيـوف : {room.numberOfBeds}</span>
                                                                    )}
                                                                    {isVideo ? (
                                                                        <video
                                                                            src={img}
                                                                            controls
                                                                            preload="metadata"
                                                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                                        >
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    ) : (
                                                                        <img src={img} alt={room.name} />
                                                                    )}
                                                                </a>
                                                            </figure>
                                                        </SwiperSlide>
                                                    );
                                                })
                                            }

                                            <div className="swiper-btn-cont swiper-btn-2" id={`swiper-btn-prev1a`}>
                                                <div className="swiper-btn-prev swiper-btn">
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>

                                                <div className="swiper-btn-next swiper-btn" id={`swiper-btn-next1a`}>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                </div>
                                            </div>
                                        </Swiper>
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
                                                {
                                                    room.price && Number(room.price > 0) ?
                                                        <div className="price">
                                                            <span>{Number(room.price).toFixed(1)}</span>
                                                            <span className="currency">{data.currencyName}</span>
                                                        </div>
                                                        : null
                                                }
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
        </section >
    )
}

export default HotelRooms
