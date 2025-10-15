import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/footerLogo.svg'
import profileImage from '../../../public/home/profile.svg'
import LoginDialog from '../login/LoginDialog'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import axios from 'axios'
import { API_BASE_URL } from '../../lib/apiConfig'
import { motion } from "framer-motion";

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/profile`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
                setProfile(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    return (
        <motion.section
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            viewport={{ once: true }}
            transition={{ duration: 1}}
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
                    <NavLink to='/table'>خدمـــاتنا</NavLink>
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
                                <NavLink className="w-full text-white" to="/table">خدمـــاتنا</NavLink>
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
