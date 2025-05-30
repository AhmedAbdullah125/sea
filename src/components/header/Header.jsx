import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/footerLogo.svg'
import profile from '../../../public/home/profile.svg'

const Header = () => {
    return (
        <section className='header-cont'>
            <div className="container nav-cont">
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" loading='lazy' />
                    </Link>
                </div>
                <div className="main-links">
                    <NavLink to='/'>الرئيسية</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/table'>خدمـــاتنا</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>التــأشيــرات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>النقل و المــواصلات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>المدونـة</NavLink>
                </div>
                <div className="account-cont">
                    <Link to="/profile" className='profile'><LazyLoadImage src={profile} alt="logo" loading='lazy' /></Link>
                    <Link to="/register" className='register'><span>أنشئ حســـاب الان</span><i className="fa-solid fa-chevron-left"></i></Link>
                </div>
            </div>
        </section>
    )
}

export default Header
