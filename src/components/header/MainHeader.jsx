import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/seaLogo.svg'
import LoginDialog from '../login/LoginDialog'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import axios from 'axios'
import { API_BASE_URL } from '../../lib/apiConfig'
import Loading from '../loading/Loading'
import { motion } from "framer-motion";
const MainHeader = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (

        <motion.section
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`main-header-cont  lg:fixed top-0 left-0 right-0 z-[9999] gap-3 py-5  transition-colors duration-500 ${scrolled ? 'bg-main-navy ' : 'bg-transparent'}`}>


            <div className="container upper-nav-cont">
                <div className="r-links">
                    <NavLink to="/add-house">أضف سكنـك</NavLink>
                   
                            <NavLink to={`https://wa.me/${loading ? '' : data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>أضف بــاقتك</NavLink>
                    <NavLink to="/packages">بـــاقات حــول العـالم</NavLink>
                </div>
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" loading='lazy' />
                    </Link>
                </div>
                <div className="l-links">
                    <LoginDialog mainHeader />
                    <NavLink to="/packages">تســـوق معنــا</NavLink>
                    <a href="#contactusinfos">حمل التطبيـــق من هنا</a>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bars-dropdown">
                            <i className='fa-bars fa-solid text-white text-xl'></i>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#016AB5] rounded-2xl" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <LoginDialog mainHeader />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/add-house">أضف سكنـك</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>أضف بــاقتك</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/packages">بـــاقات حــول العـالم</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink className="w-full text-white" to="/packages">تســـوق معنــا</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a className="w-full text-white" href="#contactusinfos">حمل التطبيـــق من هنا</a>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink className="w-full text-white" to='/hotels'>فــنادق وشقــق</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NavLink className="w-full text-white" to='/packages'>باقــات حـول العالم</NavLink>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                                        <NavLink className="w-full text-white" to='/privite-tours'>النقل و المــواصلات</NavLink>
                                    </DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <NavLink className="w-full text-white" to='/visa'>التــأشيــرات</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NavLink className="w-full text-white" to='/table'>جدولك علينا</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NavLink className="w-full text-white" to='/blogs'>المدونـة</NavLink>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className={`container lower-nav-cont transition-all duration-500 ${scrolled ? 'hidden' : ''}`}>
                <div className="main-links">
                    <NavLink to='/'>الرئيسية</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/hotels'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/packages'>باقــات حـول العالم</NavLink>
                    {/* <div className="noqta"></div>
                                <NavLink to='/privite-tours'>النقل و المــواصلات</NavLink> */}
                    <div className="noqta"></div>
                    <NavLink to='/visa'>التــأشيــرات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/table'>جدولك علينا</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/blogs'>المدونـة</NavLink>
                </div>
            </div>


        </motion.section>


    )
}
export default MainHeader