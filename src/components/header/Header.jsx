import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/app/footerLogo.svg'
import LoginDialog from '../login/LoginDialog'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion";

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsFixed(true);
            } else if (window.scrollY < 70) {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`header-cont ${isFixed ? 'fixed-navbar' : ''}`}>
            <div className="container nav-cont">
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" loading='lazy' />
                    </Link>
                </div>
                <div className="main-links">
                    <NavLink to='/'>الرئيسية</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/your_plan'>خدمـــاتنا</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/hotels'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/previsa'>التــأشيــرات</NavLink>
                    {/* <div className="noqta"></div>
                    <NavLink to='/privite-tours'>النقل و المــواصلات</NavLink> */}
                    <div className="noqta"></div>
                    <NavLink to='/blogs'>المدونـة</NavLink>
                </div>
                <div className="account-cont">
                    {/* {
                        loading ?
                            <Link to="/account/profile" className='profile'>
                                <LazyLoadImage src={profileImage} alt="logo" loading='lazy' className='w-[18px]' />
                            </Link>
                            :
                            null
                    } */}
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
                                <NavLink className="w-full text-white" to="/your_plan">خدمـــاتنا</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/hotels">فــنادق وشقــق</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/previsa">التــأشيــرات</NavLink>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/privite-tours">النقل و المــواصلات</NavLink>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/blogs">المدونـة</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.section>
    )
}

export default Header
