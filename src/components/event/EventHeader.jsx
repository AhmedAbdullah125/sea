import React, { useState, useEffect } from 'react'
import imgicon1 from '../../../public/app/imgIcon-1.svg'
import imgicon2 from '../../../public/app/imgIcon-2.svg'
import imgicon3 from '../../../public/app/imgIcon-2.jpeg'
import { toggleFavourates } from '../../pages/toggleFavourates'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from "framer-motion";
import locatioImage from '../../../public/app/location.png'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
const EventHeader = ({ data }) => {
    // Helpers (inside your component file)
    const arabicOrdinal = (i) => {
        const map = [
            "الأول", "الثاني", "الثالث", "الرابع", "الخامس",
            "السادس", "السابع", "الثامن", "التاسع", "العاشر",
        ];
        return i < map.length ? map[i] : `${i + 1}`; // fallback: رقم
    };

    const PinIcon = () => (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 4.97 7 13 7 13s7-8.03 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
        </svg>
    );

    const ChevronLeft = () => (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rotate-180" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
        </svg>
    );

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [selectedImg, setselectedImg] = useState(data.images[0])
    Fancybox.bind("[data-fancybox]", {});
    Fancybox.bind("[data-fancybox-video]", {});

    const [lovedEvents, setLovedEvents] = useState(localStorage.getItem('lovedEvents') ? JSON.parse(localStorage.getItem('lovedEvents')) : [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedEvents')) {
                setLovedEvents(localStorage.getItem('lovedEvents') ? JSON.parse(localStorage.getItem('lovedEvents')) : []);
            }
            else {
                localStorage.setItem('lovedEvents', []);
            }
        }
    }, [data])
    const [images, setImages] = useState([])
    useEffect(() => {
        if (data?.vedios?.length > 0 && data?.vedios[0] !== "https://panel.seatourism.sa/storage") {
            setImages([...data?.vedios, ...data?.images])
        }
        else { setImages(data?.images) }
    }, [data])


    return (
        <section className="content-section">
            <div className="container">
                <div className="flex items-center justify-between">
                    <h2 className="detail-title">{data.nameEvents}</h2>

                </div>
                <div className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data.rating).toFixed(1)} <span>( {data.reviewsCount} )</span></span>
                        </div>
                        {
                            data?.city?.name ?
                                <div className="detail-info-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{data?.city?.name} {data?.city?.name && '-'} {data?.country?.name}</span>
                                </div> : null
                        }
                        <div className="detail-info-item">
                            <i className="fa-solid fa-users"></i>
                            <span>{data?.targetAudience}</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
                        {
                            data?.locations?.length == 1 ?
                                <a href={`https://www.google.com/maps/search/?api=1&query=${data.locations[0].latitude},${data.locations[0].longitude}`} target="_blank" rel="noopener noreferrer" className="add-btn">
                                    <img src={locatioImage} alt="location" className='w-6 h-6 object-contain have-animation ' />
                                </a>
                                : data?.locations?.length > 1 ?
                                    <AlertDialog className="sm:rounded-xl rounded-lg">
                                        <AlertDialogTrigger asChild >
                                            <div href={`https://www.google.com/maps/search/?api=1&query=${data.locations[0].latitude},${data.locations[0].longitude}`} target="_blank" rel="noopener noreferrer" className="add-btn">
                                                <img src={locatioImage} alt="location" className='w-6 h-6 object-contain have-animation ' />
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white rounded-xl overflow-hidden">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle >
                                                    <div className="dg-title w-full flex items-center justify-between p-5">
                                                        <span>عرض على الخرائط</span>
                                                        <AlertDialogCancel><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                                    </div>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <ul dir="rtl" className="flex flex-wrap items-center justify-center gap-3">
                                                        {(data?.locations ?? []).map((loc, idx) => {
                                                            const lat = Number(loc?.latitude);
                                                            const lng = Number(loc?.longitude);
                                                            const valid = Number.isFinite(lat) && Number.isFinite(lng);
                                                            const href = valid
                                                                ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
                                                                : undefined;
                                                            if (!valid) {
                                                                return (
                                                                    <li key={idx}>
                                                                        <span
                                                                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400"
                                                                            title="إحداثيات غير صالحة"
                                                                        >
                                                                            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200">
                                                                                <PinIcon />
                                                                            </span>
                                                                            موقع غير متاح
                                                                        </span>
                                                                    </li>
                                                                );
                                                            }
                                                            return (
                                                                <li key={idx}>
                                                                    <a
                                                                        href={href}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        title={`${lat.toFixed(6)}, ${lng.toFixed(6)}`}
                                                                        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 transition-all hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                                                                    >
                                                                        <span className="text-slate-400 transition-transform group-hover:translate-x-0.5">
                                                                            <ChevronLeft />
                                                                        </span>
                                                                        <span className="font-medium">
                                                                            {loc?.name || `الموقع ${arabicOrdinal(idx)}`}
                                                                        </span>
                                                                        <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                                                                            <PinIcon />
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            {/* <AlertDialogFooter>
                                            <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter> */}
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    : null
                        }
                        {/* make button copy the path of this site */}
                        <AlertDialog className="sm:rounded-xl rounded-lg">
                            <AlertDialogTrigger asChild >
                                <span className="add-btn">
                                    <i className="fa-solid fa-share-nodes"></i>
                                </span>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white rounded-xl overflow-hidden">
                                <AlertDialogHeader>
                                    <AlertDialogTitle >
                                        <div className="dg-title w-full flex items-center justify-between border-b-2 border-gray-200 p-5">
                                            <span>مشاركة الخطه</span>
                                            <AlertDialogCancel><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                        </div>
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="pc-feats">
                                            <h4>{data?.nameEvents}</h4>
                                            <h5>شارك {data?.nameEvents} عبر </h5>
                                            <div className="social-icns">
                                                <Link target="_blank" to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}>
                                                    <i className="fa-brands fa-facebook"></i>
                                                </Link>
                                                <Link target="_blank" to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}>
                                                    <i className="fa-brands fa-twitter"></i>
                                                </Link>
                                                <Link target="_blank" to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}>
                                                    <i className="fa-brands fa-linkedin"></i>
                                                </Link>
                                                {/* whatsapp */}
                                                <Link target="_blank" to={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}>
                                                    <i className="fa-brands fa-whatsapp"></i>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        const decodedUrl = decodeURIComponent(window.location.href);
                                                        navigator.clipboard.writeText(decodedUrl);
                                                        toast.success('تم نسخ الرابط');
                                                    }}
                                                >
                                                    <i className="fa-solid fa-copy"></i>
                                                </button>



                                            </div>

                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                {/* <AlertDialogFooter>
                                            <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter> */}
                            </AlertDialogContent>
                        </AlertDialog>
                        {/* make button adding id of hotel to localstorage if it not exist and remove it if it exist */}
                        <button className="add-btn"
                            onClick={
                                () => {
                                    if (sessionStorage.getItem('token')) {
                                        if (lovedEvents.includes(Number(id))) {
                                            setLovedEvents(lovedEvents.filter(id => id !== Number(id)))
                                            localStorage.setItem('lovedEvents', JSON.stringify(lovedEvents.filter(id => id !== Number(id))))
                                        }
                                        else {
                                            setLovedEvents([...lovedEvents, Number(id)])
                                            localStorage.setItem('lovedEvents', JSON.stringify([...lovedEvents, Number(id)]))
                                        }
                                        toggleFavourates(Number(id), 'Event');
                                    }
                                    else {
                                        toast.error('يجب تسجيل الدخول اولا')
                                        window.location.href = '/login'
                                    }
                                }
                            }
                        ><i className={`fa-heart ${lovedEvents.includes(Number(id)) ? 'fa-solid text-[#A71755]' : 'fa-regular'}`}></i></button>

                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="detail-cont">
                    <div className="detail-box">

                        <figure className="detail-img">
                            {
                                data?.videoYoutube ?
                                    // <iframe width="560" height="315" src={data?.videoYoutube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data?.videoYoutube.split('v=')[1]}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    :
                                    data?.vedios?.length > 0 && data?.vedios[0] !== "https://panel.seatourism.sa/storage" ?
                                        <video src={data?.vedios[0]} className="img-fluid" controls preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                        :
                                        <img src={data?.images[0]} className="img-fluid" alt="detail-img" />
                            }
                        </figure>
                        <div className="detail-img-btn">
                            <a href={data?.images[0]} data-caption={data?.title} data-fancybox="gallery" className="single-img">
                                <button className="add-btn">
                                    <img src={imgicon1} alt="icon" />
                                </button>
                            </a>
                            {
                                data?.vedios?.length > 0 && data?.vedios[0] != "https://panel.seatourism.sa/storage" ?
                                    <a href={data?.vedios[0]} data-caption={data?.title} data-fancybox="vids" className="single-img">
                                        <button className="add-btn">
                                            <img src={imgicon2} alt="icon" />
                                        </button>
                                    </a>
                                    : null

                            }
                            {
                                data?.videoReel ?
                                    <a href={data?.videoReel} className="single-img" target="_blank">
                                        <button className="add-btn">
                                            <img src={imgicon3} alt="icon" />
                                        </button>
                                    </a>
                                    : null
                            }
                        </div>
                    </div>
                    {images.map((mediaUrl, idx) => {
                        return (
                            <div className="detail-box" key={idx}>
                                <figure className="detail-img">
                                    {
                                        idx == 3 ?
                                            <img src={mediaUrl} className="img-fluid" alt="detail-img" />
                                            :
                                            data?.vedios?.length > 0 && idx == 0 && data?.vedios[0] != "https://panel.seatourism.sa/storage" ? (
                                                <a href={data?.vedios[0]} data-caption={data?.title} data-fancybox="gallery" className="single-img">
                                                    <video src={data?.vedios[0]} className="img-fluid" muted preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                                </a>
                                            ) : (
                                                <a href={mediaUrl} data-caption={data?.title} data-fancybox="gallery" className="single-img">
                                                    <img src={mediaUrl} className="img-fluid" alt="detail-img" />
                                                </a>
                                            )
                                    }
                                    {
                                        idx == 3 && data?.images.length > 3 ?
                                            <div className="rest"><a href={mediaUrl} data-caption={data?.title} data-fancybox="gallery">+{data?.images.length - 3}</a></div>
                                            : null
                                    }
                                </figure>
                            </div>
                        );
                    })}

                </motion.div>
            </div>
        </section>
    )
}

export default EventHeader
