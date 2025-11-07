import React, { useEffect, useState } from 'react'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
import { toast } from 'sonner'
import { toggleFavourates } from '../../pages/toggleFavourates'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom'
const HotelHeader = ({ data }) => {
    const token = sessionStorage.getItem('token')
    const [images, setImages] = useState([])
    Fancybox.bind("[data-fancybox]", {});
    Fancybox.bind("[data-fancybox-video]", {});
    useEffect(() => {
        if (data?.vedios?.length > 0 && data?.vedios[0] !== "https://panel.seatourism.sa/storage") {
            setImages([...data?.vedios, ...data?.images])
        }
        else { setImages(data?.images) }   
    },[data])
    return (
        <section className="content-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="detail-title">{data?.title}</h2>
                    <span>كود الوحدة ( {data?.code} ) </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data?.rating).toFixed(1)} <span>( {data?.reviewsCount} )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{data?.address}</span>
                        </div>
                        {
                            data?.area ?
                                <div className="detail-info-item">
                                    <i className="fa-solid fa-location-crosshairs"></i>
                                    <span>مساحة الوحدة {data?.area} م²</span>
                                </div>
                                : null
                        }

                        <div className="detail-info-item">
                            <i className="fa-solid fa-users"></i>
                            <span>{data?.advantages.map((adv, idx) => idx === data?.advantages.length - 1 ? adv : adv + ', ')}</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
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
                                            <span>مشاركة الفندق</span>
                                            <AlertDialogCancel><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                        </div>
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="pc-feats">
                                            <h4>{data?.title}</h4>
                                            <h5>شارك {data?.title} عبر </h5>
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
                        {
                            token ?
                                <button className="add-btn"
                                    onClick={
                                        () => {
                                            if (sessionStorage.getItem('token')) {
                                                toggleFavourates(data?.id, 'Hotel');
                                            }
                                            else {
                                                toast.error('يجب تسجيل الدخول اولا')
                                                window.location.href = '/login'
                                            }
                                        }
                                    }
                                ><i className={`fa-heart ${data?.is_favourite ? 'fa-solid text-[#A71755]' : 'fa-regular'}`}></i></button>
                                : null
                        }

                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="detail-cont">
                    <div className="detail-box">

                        <figure className="detail-img">
                            {data?.vedios?.length > 0 && data?.vedios[0] !== "https://panel.seatourism.sa/storage" ? 
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

export default HotelHeader
