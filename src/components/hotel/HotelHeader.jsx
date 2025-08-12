import React, { useEffect, useState } from 'react'
import imgicon1 from '../../assets/imgIcon-1.svg'
import imgicon2 from '../../assets/imgIcon-2.svg'
import { toast } from 'sonner'
import { toggleFavourates } from '../../pages/toggleFavourates'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
const HotelHeader = ({ data }) => {
    const [selectedImg, setselectedImg] = useState(data.images[0])
    const [lovedHotels, setLovedHotels] = useState(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : [])
    const [videosArr, setVideosArr] = useState([])
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    Fancybox.bind("[data-fancybox-video]", {
        // Your custom options
    });
    // Link swipers after both are ready
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedHotels')) {
                setLovedHotels(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : []);
            }
            else {
                localStorage.setItem('lovedHotels', []);
            }
        }
    }, [data])
    useEffect(() => {
        let vids = []
        for (let i = 0; i < data.images.length; i++) {
            if (data.images[i].includes('.mp4') || data.images[i].includes('.mov') || data.images[i].includes('.webm')) {
                vids = [...vids, data.images[i]]
            }

        }
        setVideosArr(vids)
    }, [data.videos])
    console.log(videosArr);


    return (
        <section className="content-section">
            <div className="container">
                <h2 className="detail-title">{data.title}</h2>
                <span>كود الوحدة ( {data.code} ) </span>
                <div className="detail-info-cont">
                    <div className="detail-info">
                        <div className="detail-info-item rate">
                            <i className="fa-solid fa-star"></i>
                            <span>{Number(data.rating).toFixed(1)} <span>( {data.reviewsCount} )</span></span>
                        </div>
                        <div className="detail-info-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{data.address}</span>
                        </div>

                        <div className="detail-info-item">
                            <i className="fa-solid fa-location-crosshairs"></i>
                            <span>مساحة الوحدة {data.area} م²</span>
                        </div>

                        <div className="detail-info-item">
                            <i className="fa-solid fa-users"></i>
                            <span>{data.advantages[0]}</span>
                        </div>
                    </div>
                    <div className="detail-info-btn">
                        {/* make button copy the path of this site */}
                        <button className="add-btn" onClick={() => {
                            toast.success('تم نسخ الرابط')
                            navigator.clipboard.writeText(window.location.href)
                        }}>
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                        {/* make button adding id of hotel to localstorage if it not exist and remove it if it exist */}
                        <button className="add-btn"
                            onClick={
                                () => {
                                    if (sessionStorage.getItem('token')) {
                                        if (lovedHotels.includes(data.id)) {
                                            setLovedHotels(lovedHotels.filter(id => id !== data.id))
                                            localStorage.setItem('lovedHotels', JSON.stringify(lovedHotels.filter(id => id !== data.id)))
                                        }
                                        else {
                                            setLovedHotels([...lovedHotels, data.id])
                                            localStorage.setItem('lovedHotels', JSON.stringify([...lovedHotels, data.id]))
                                        }
                                        toggleFavourates(data.id, 'Hotel');
                                    }
                                    else {
                                        toast.error('يجب تسجيل الدخول اولا')
                                        window.location.href = '/login'
                                    }
                                }
                            }
                        ><i className={`fa-heart ${lovedHotels.includes(data.id) ? 'fa-solid text-[#A71755]' : 'fa-regular'}`}></i></button>
                    </div>
                </div>
                <div className="detail-cont">
                    <div className="detail-box">

                        <figure className="detail-img">
                            {/\.(mp4|mov|webm)$/i.test(selectedImg) ? (
                                <video src={selectedImg} className="img-fluid" controls preload="metadata" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            ) : (
                                <img src={selectedImg} className="img-fluid" alt="detail-img" />
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
                                    onClick={() => setselectedImg(mediaUrl)}
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

                </div>
            </div>
        </section>
    )
}

export default HotelHeader
