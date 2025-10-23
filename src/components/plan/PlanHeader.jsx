import React, { useEffect, useState } from 'react'
import detailImg from '../../assets/detail.jpg'
import img1 from '../../assets/s.svg'
import img2 from '../../assets/check.svg'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { toast } from 'sonner'
import { toggleFavourates } from '../../pages/toggleFavourates'
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const PlanHeader = ({ data }) => {
    const [lovedPlans, setLovedPlans] = useState(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : [])
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    Fancybox.bind("[data-fancybox-video]", {
        // Your custom options
    });
    // Link swipers after both are ready
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedPlans')) {
                setLovedPlans(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : []);
            }
            else {
                localStorage.setItem('lovedPlans', []);
            }
        }
    }, [data])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedPlans')) {
                setLovedPlans(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : []);
            }
            else {
                localStorage.setItem('lovedPlans', []);
            }
        }
    }, [data])
    const [selectedImage, setSelectedImage] = useState(data.thumbnail)
    const [videosArr, setVideosArr] = useState([])
    useEffect(() => {
        let vids = []
        for (let i = 0; i < data.images.length; i++) {
            if (data.images[i].includes('.mp4') || data.images[i].includes('.mov') || data.images[i].includes('.webm')) {
                vids = [...vids, data.images[i]]
            }

        }
        setVideosArr(vids)
    }, [data.videos])
    return (
        <section className="content-section">
            <div className="container">
                <div className="flex justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="detail-title">{data.title}</h2>
                        <div className="detail-time">{data.durationDays} أيـــــــــام</div>
                    </motion.div>
                    <motion.div
                        inherit
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}>
                        <h4 className='text-main-navy text-3xl font-bold'>#{data.id}</h4>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data.rating).toFixed(1)} <span>( {data.reviewsCount} )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-bullseye"></i>
                            <span>رحلة لمـــــدة {data.durationDays} ليــــــــالي</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
                        <button className="add-btn" onClick={() => {
                            toast.success('تم نسخ الرابط')
                            navigator.clipboard.writeText(window.location.href)
                        }}>
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                        <button className="add-btn"
                            onClick={
                                () => {
                                    if (sessionStorage.getItem('token')) {
                                        if (lovedPlans.includes(data?.id)) {
                                            setLovedPlans(lovedPlans.filter(id => id !== data?.id))
                                            localStorage.setItem('lovedPlans', JSON.stringify(lovedPlans.filter(id => id !== data?.id)))
                                        }
                                        else {
                                            setLovedPlans([...lovedPlans, data?.id])
                                            localStorage.setItem('lovedPlans', JSON.stringify([...lovedPlans, data?.id]))
                                        }
                                        toggleFavourates(data?.id, 'Plan');
                                    }
                                    else {
                                        toast.error('يجب تسجيل الدخول اولا')
                                        window.location.href = '/login'
                                    }
                                }
                            }
                        ><i className={` fa-heart ${lovedPlans.includes(data.id) ? 'fa-solid text-[#a71755]' : 'fa-regular'}`}></i></button>
                    </div>
                </motion.div>
                {
                    data.images.length > 0 ?
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }} className="detail-cont">
                            <div className="detail-box">

                                <figure className="detail-img">
                                    {/\.(mp4|mov|webm)$/i.test(data.thumbnail) ? (
                                        <video src={data.thumbnail} className="img-fluid" controls preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    ) : (
                                        <img src={data.thumbnail} className="img-fluid" alt="detail-img" />
                                    )}
                                </figure>
                                <div className="detail-img-btn">
                                    <a href={data.images[0]} data-fancybox="gallery" data-caption={`Image 1`} className="single-img">
                                        <button className="add-btn">
                                            <img src={imgicon1} alt="icon" />
                                        </button>
                                    </a>
                                    {
                                        videosArr.length > 0 ?
                                            <a href={videosArr[0]} data-fancybox="vids" data-caption={`Video 1`} className="single-img">
                                                <button className="add-btn">
                                                    <img src={imgicon2} alt="icon" />
                                                </button>
                                            </a>
                                            : null

                                    }
                                </div>
                            </div>
                            {data.images.map((mediaUrl, idx) => {
                                const isVideo = /\.(mp4|mov|webm)$/i.test(mediaUrl);

                                return (
                                    <div className="detail-box" key={idx}>
                                        <figure
                                            className="detail-img"
                                        >
                                            {
                                                idx == 3 ?
                                                    isVideo ? (
                                                        <video src={mediaUrl} className="img-fluid" controls preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                                    )
                                                        :
                                                        <img src={mediaUrl} className="img-fluid" alt="detail-img" />
                                                    :
                                                    isVideo ? (
                                                        <a href={mediaUrl} data-fancybox="gallery" data-caption={`Video ${idx + 1}`} className="single-img">
                                                            <video src={mediaUrl} className="img-fluid" muted preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                                        </a>
                                                    ) : (
                                                        isVideo ? (
                                                            <a href={mediaUrl} data-fancybox="gallery" data-caption={`Image ${idx + 1}`} className="single-img">
                                                                <img src={mediaUrl} className="img-fluid" alt="detail-img" />
                                                            </a>
                                                        ) :
                                                            (
                                                                <a href={mediaUrl} data-fancybox="gallery" data-caption={`Image ${idx + 1}`} className="single-img">
                                                                    <img src={mediaUrl} className="img-fluid" alt="detail-img" />
                                                                </a>
                                                            )
                                                    )
                                            }
                                            {
                                                idx == 3 ?
                                                    <div className="rest"><a href={mediaUrl} data-fancybox="gallery">+{data.images.length - 3}</a></div>
                                                    : null
                                            }
                                        </figure>
                                    </div>
                                );
                            })}

                        </motion.div>
                        : null
                }
                <div className="damans">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="daman">
                        <div className="r-side">
                            <div className="img-cont">
                                <img src={img1} alt="" />
                            </div>
                            <div className="info">
                                <h3>ضمــــــــان سي / SEA. <img src={img2} alt="" /></h3>
                                <span>نضمن لك صحة المعلومات ونظافة المكان</span>
                            </div>
                        </div>

                    </motion.div>
                    {
                        data.ownerComment ?
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full daman"
                                defaultValue="item-1"
                            >
                                <AccordionItem value="item-2" className="daman-accordion w-full">
                                    <AccordionTrigger className=" p-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="flex items-center justify-between w-full">
                                            <div className="r-side">
                                                <div className="name-cont">
                                                    {

                                                        data?.ownerName ?
                                                            data.ownerName.slice(0, 1) :
                                                            <img src={profileActive} alt="profile" />
                                                    }
                                                </div>
                                                <div className="info">
                                                    <h3>{data.ownerName ? data.ownerName : "عميل ســـي"} <span className='fasla'></span> {data?.ownerCompanyName ? data.ownerCompanyName : null}  <img src={img2} alt="" /></h3>
                                                    <p className='text-base text-[#6F6F6F] font-medium text-start'>{data.companyCaption}</p>
                                                </div>
                                            </div>
                                            <div className="l-side">
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </div>
                                        </motion.div>

                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
                                        <p className='text-base text-[#6F6F6F] font-medium'> 
                                            {data.ownerComment}
                                        </p>

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            :
                            <div className="daman">

                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center justify-between w-full">
                                <div className="r-side">
                                    <div className="name-cont">
                                        {

                                            data?.ownerName ?
                                                data.ownerName.slice(0, 1) :
                                                <img src={profileActive} alt="profile" />
                                        }
                                    </div>
                                    <div className="info">
                                        <h3>{data.ownerName ? data.ownerName : "عميل ســـي"} <span className='fasla'></span> {data?.ownerCompanyName ? data.ownerCompanyName : null}  <img src={img2} alt="" /></h3>
                                        <p className='text-base text-[#6F6F6F] font-medium'>{data.companyCaption}</p>
                                    </div>
                                </div>
                                
                            </motion.div>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default PlanHeader
