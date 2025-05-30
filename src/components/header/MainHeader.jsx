import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/seaLogo.svg'

const MainHeader = () => {
    return (
        <section className='main-header-cont'>
            <div className="container upper-nav-cont">
                <div className="r-links">
                    <NavLink to="/">أضف سكنـك</NavLink>
                    <NavLink to="/">أضف بــاقتك</NavLink>
                    <NavLink to="/">بـــاقات حــول العـالم</NavLink>
                </div>
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" loading='lazy' />
                    </Link>
                </div>
                <div className="l-links">
                    <NavLink to="/">انشىء حسابك الآن</NavLink>
                    <NavLink to="/">تســـوق معنــا</NavLink>
                    <NavLink to="/">حمل التطبيـــق من هنا</NavLink>
                </div>
            </div>
            <div className="container lower-nav-cont">
                <div className="main-links">
                    <NavLink to='/'>الرئيسية</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>باقــات حـول العالم</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>النقل و المــواصلات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>التــأشيــرات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/table'>جدولك علينا</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>المدونـة</NavLink>
                </div>
            </div>
        </section>
    )
}

export default MainHeader
