import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/footerLogo.svg'
import profile from '../../../public/home/profile.svg'
import LoginDialog from '../login/LoginDialog'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <section className={`header-cont ${isFixed ? 'fixed-navbar' : ''}`}>
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
                    <NavLink to='/visa'>التــأشيــرات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/privite-tours'>النقل و المــواصلات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/blogs'>المدونـة</NavLink>
                </div>
                <div className="account-cont">
                    <Link to="/profile" className='profile'><LazyLoadImage src={profile} alt="logo" loading='lazy' /></Link>
                    <LoginDialog />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bars-dropdown">
                            <i className='fa-bars fa-solid text-[#016AB5] text-xl'></i>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#016AB5] rounded-2xl" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/table">خدمـــاتنا</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/hotels">فــنادق وشقــق</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/visa">التــأشيــرات</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/privite-tours">النقل و المــواصلات</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/blogs">المدونـة</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    )
}

export default Header
