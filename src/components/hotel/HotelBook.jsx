import React, { useContext, useState } from 'react'
import img1 from '../../assets/s.svg'
import img2 from '../../assets/check.svg'
import { userContext } from '../../context/UserContext';
import profileActive from '../../assets/profileActive.svg'
import { motion } from "framer-motion";

const HotelBook = ({ data }) => {
    return (
        <section className="content-section">
            <div className="container">
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
                        <div className="l-side">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="daman">
                        <div className="r-side">
                            <div className="name-cont">
                                {/* first letter of the name */}
                                {data?.ownerName?
                                data.ownerName.slice(0, 1):
                                <img  src={profileActive} alt="profile" />
                                }
                            </div>
                            <div className="info">
                                <h3>{data.ownerName?data.ownerName:"عميل ســـي"} <img src={img2} alt="" /></h3>
                                <div className="dets"><p><i className="fa-solid fa-star"></i> <span>{Number(data.ownerRating).toFixed(1)}</span></p> <div className="fasel"> <p><i className="fa-solid fa-house"></i> <span>{data.rentalPeriod}</span></p></div></div>
                            </div>
                        </div>
                        <div className="l-side">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default HotelBook
