import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/apiConfig";
import Loading from "../components/loading/Loading";
import waImage from '../assets/wa.svg'
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useGetSettings } from '@/components/global/useGetSettings';

import { Calendar } from "@/components/ui/calendar";
function formatDate(d) {
    if (!d) return "";
    // Arabic/Egypt formatting example – tweak as you like:
    return d.toLocaleDateString("ar-EG", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
export default function Favourates() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedPersonsNumber, setSelectedPersonsNumber] = useState(1);
    const [selectedChildrenNumber, setSelectedChildrenNumber] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTo, setSelectedDateTo] = useState(null);
    const { data: settings, isLoading, isError } = useGetSettings();

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
    function formatArabicDate(dateStr) {
        const date = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(date);
    }
    const t = { "hotels": "الفنادق", "plans": "الباقات", "rooms": "الغرف" }
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    return (
        <div className="reservation-cont">
            <div className="fav-filter">
                {
                    selectedHotels.length > 1 || selectedRooms.length > 1 ?
                        <div className="persons-sele bg-body mb-5 flex items-center justify-center gap-2 flex-wrap xl:flex-nowrap">
                            <Select dir="rtl"
                                onValueChange={(val) => setSelectedPersonsNumber(val)}
                            >
                                <SelectTrigger icon={<div className="  size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                                    <ChevronDown size={14} />
                                </div>} className={` text-[#797979]  text-xs font-semibold border-slate-800 bg-white  rounded-full h-12`}>
                                    <SelectValue placeholder={"اختر عدد الاشخاص..."} className="text-red bg-body" />
                                </SelectTrigger>
                                <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                                    {Array.from({ length: 10 }, (_, index) => index + 1).map((option) => (
                                        <SelectItem key={option} value={String(option)} className=" cursor-pointer focus:bg-body rounded-xl">
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select dir="rtl"
                                onValueChange={(val) => setSelectedChildrenNumber(val)}
                            >
                                <SelectTrigger icon={<div className="size-6 flex items-center justify-center text-white bg-main-navy rounded-full">
                                    <ChevronDown size={14} />
                                </div>} className={` text-[#797979]  text-xs font-semibold border-slate-800  bg-white rounded-full h-12`}>
                                    <SelectValue placeholder={"اختر عدد الاطفال..."} className="text-red bg-body" />
                                </SelectTrigger>
                                <SelectContent className=" shadow border-none rounded-xl bg-white  ">
                                    {Array.from({ length: 10 }, (_, index) => index + 1).map((option) => (
                                        <SelectItem key={option} value={String(option)} className=" cursor-pointer focus:bg-body rounded-xl">
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Popover className="bg-white">
                                <PopoverTrigger asChild >
                                    <Button
                                        variant="outline"
                                        className="bg-white rounded-full h-12 w-full flex justify-between"
                                    >
                                        {selectedDate ? (
                                            <span className="font-semibold text-sm">{(selectedDate)}</span>
                                        ) : (
                                            <span className="text-[#797979] text-xs font-semibold">اختر تاريخ الوصول</span>
                                        )}
                                        <ChevronDown size={14} />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate ?? undefined}   // pass a Date or undefined
                                        onSelect={(date) => setSelectedDate(formatDate(date) ?? null)}
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover className="bg-white">
                                <PopoverTrigger asChild >
                                    <Button
                                        variant="outline"
                                        className="bg-white rounded-full h-12 w-full flex justify-between"
                                    >
                                        {selectedDateTo ? (
                                            <span className="font-semibold text-sm">{(selectedDateTo)}</span>
                                        ) : (
                                            <span className="text-[#797979] text-xs font-semibold">اختر تاريخ الخروج</span>
                                        )}
                                        <ChevronDown size={14} />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0 bg-white rounded-xl border-none shadow-md" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDateTo ?? undefined}   // pass a Date or undefined
                                        onSelect={(date) => setSelectedDateTo(formatDate(date) ?? null)}
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        : null
                }
            </div>
            {
                loading || loading ? <Loading /> :
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
                                                item.type == "hotels" ?

                                                    selectedHotels.length > 1 && item.type == "hotels" && settings ?
                                                        <a className="btn-wa max-w-56" href={`https://wa.me/${settings.whatsapp}?text=  اريد مناقشتكم عن مقارنه بين الفنادق ${selectedHotels.map(item => item).join(', ')} ${selectedPersonsNumber ? `ل ${selectedPersonsNumber} اشخاص و ${selectedChildrenNumber} اطفال` : ""} ${selectedDate && selectedDateTo ? `من تاريخ ${selectedDate} الى تاريخ ${selectedDateTo}` : ""}`}>
                                                            <span>
                                                                قارن الفنادق المحددة
                                                            </span>
                                                            <img src={waImage} alt="whatsapp" />
                                                        </a>
                                                        :
                                                        null

                                                    :
                                                    item.type == "rooms" ?
                                                        selectedRooms.length > 1 && item.type == "rooms" && settings ?
                                                        <a className="btn-wa max-w-56" href={`https://wa.me/${settings.whatsapp}?text=  اريد مناقشتكم عن مقارنه بين الغرف ${selectedRooms.map(item => item).join(', ')} ${selectedPersonsNumber ? `ل ${selectedPersonsNumber} اشخاص و ${selectedChildrenNumber} اطفال` : ""} ${selectedDate && selectedDateTo ? `من تاريخ ${selectedDate} الى تاريخ ${selectedDateTo}` : ""}`}>
                                                                <span>
                                                                    قارن الغرف المحددة
                                                                </span>
                                                                <img src={waImage} alt="whatsapp" />
                                                            </a>
                                                            :
                                                            null
                                                        : null
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

                                                    : item.type == "plans" ?

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
                                                        : item.type == "rooms" ?

                                                            item.items.map((room, index) =>
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -50 }}
                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                                                    className="room-item card-item"
                                                                    key={index}
                                                                >
                                                                    <div className="related-item block mb-5">

                                                                        <figure className="img-cont fav-img-cont">
                                                                            {
                                                                                item.items.length > 1 ?
                                                                                    <div className={`check-box ${selectedRooms.includes(room.name) ? "active" : ""}`} onClick={() => {
                                                                                        selectedRooms.includes(room.name) ? setSelectedRooms(selectedRooms.filter(item => item !== room.name))
                                                                                            :
                                                                                            setSelectedRooms([...selectedRooms, room.name])
                                                                                    }} data-id={`${room.name}`}>
                                                                                        {
                                                                                            selectedRooms.includes(room.name) ?
                                                                                                <i className="fa-solid fa-check"></i>
                                                                                                :
                                                                                                null
                                                                                        }
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                            <img src={room.image[0]} alt={room.name} />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="info">

                                                                        <h3 className="room-name">{room.name}</h3>
                                                                        {
                                                                            room.childBedEnabled ? <span className="child-bed">أسرة أطفال / رضع مجانًا</span> : null
                                                                        }
                                                                        <div className="details">
                                                                            <div className="r-side">
                                                                                <div className="price">
                                                                                    <span>{Number(room.price).toFixed(1)}</span>
                                                                                    <span className="currency">{data.currencyName ? data.currencyName : "SAR"}</span>
                                                                                </div>
                                                                                <span className="price-per-night">المجموع ل (1) غرفة</span>
                                                                            </div>

                                                                        </div>
                                                                        <Link className="btn-wa" to={`https://wa.me/${settings.whatsapp}?text=اريد مناقشتكم عن غرفة ${room.name} في ${data.title}`}>
                                                                            <span>تخصيص الغرفة</span>
                                                                            <img src={waImage} alt="whatsapp" />
                                                                        </Link>
                                                                    </div>
                                                                </motion.div>
                                                            )
                                                            : null
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
