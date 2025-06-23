import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/footerLogo.svg'
import profile from '../../../public/home/profile.svg'
import LoginDialog from '../login/LoginDialog'
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
                    <NavLink to='/hotels'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/visa/search'>التــأشيــرات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/privite-tours'>النقل و المــواصلات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/w'>المدونـة</NavLink>
                </div>
                <div className="account-cont">
                    <Link to="/profile" className='profile'><LazyLoadImage src={profile} alt="logo" loading='lazy' /></Link>
                    <LoginDialog />
                </div>
            </div>
        </section>
    )
}

export default Header
