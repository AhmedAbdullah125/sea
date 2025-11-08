import React, { useState, useEffect } from 'react'
import VerfiyOtp from '../components/login/VerfiyOtp'
import SendOtp from '../components/login/SendOtp'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import loginIamge from '../../public/app/login.png'
const Login = () => {
    const [phone, setPhone] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const handleSendOtp = (enteredPhone) => {
        setPhone(enteredPhone);
        setIsOtpSent(true);
    };
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <div className="container">
                <div className="grid grid-cols-12 items-center gap-6">
                    <div className="xl:col-span-5  col-span-12 xl:space-y-12 space-y-6">

                        {/* form */}
                        {isOtpSent ?
                            <VerfiyOtp phone={phone} /> :
                            <SendOtp handleSendOtp={handleSendOtp} />
                        }
                    </div>
                    {/* image */}
                    <div className="xl:col-span-7  max-xl:hidden h-full">
                        <LazyLoadImage src={loginIamge} alt="logo" loading='lazy' className="h-full w-full " />
                    </div>
                </div>
            </div>

            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Login
