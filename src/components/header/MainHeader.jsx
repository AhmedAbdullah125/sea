import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/app/seaLogo.svg'
import LoginDialog from '../login/LoginDialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion";
import { useGetSettings } from '@/components/global/useGetSettings';
import Vector1 from '../../../public/app/Vector1.svg'
import Vector2 from '../../../public/app/Vector2.svg'
import goog from '../../../public/app/goog.svg'
import apl from '../../../public/app/apl.svg'
import round from '../../../public/app/round.svg'
const MainHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const { data, isLoading, isError } = useGetSettings();
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
                {/* <div className="r-links">
                    <NavLink to="/add-house">أضف سكنـك</NavLink>
                    <NavLink to={`https://wa.me/${isLoading ? '' : data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>أضف بــاقتك</NavLink>
                </div>*/}
                <div className="r-sect">
                    <LoginDialog mainHeader />
                    <a href="/#big-offers">
                        <span>إبــدا مع سـي / SEA</span>
                        {/* long arrow left */}
                        <i className='fa-solid fa-arrow-left'></i>
                    </a>

                </div>
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" isLoading='lazy' />
                    </Link>
                </div>
                {/* <div className="l-links">

                    <NavLink to="/packages">تســـوق معنــا</NavLink>
                    <a href="#contactusinfos">حمل التطبيـــق من هنا</a>
                </div> */}
                <div className="options-big">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="join-cont">
                                <div className="r-s">
                                    <span>إنضم إليــنا</span>
                                    <div className='sea-word'>
                                        <span className='plus'>+</span>
                                        <span>SEA</span>
                                    </div>
                                </div>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dropdown-menu-content" align="start">
                            {/* <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <LoginDialog mainHeader />
                            </DropdownMenuItem> */}
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to="/add-house">
                                    <div className="flex items-center gap-3">
                                        <LazyLoadImage src={Vector1} alt="logo" loading='lazy' />
                                        <span> اضف سكنك</span>
                                    </div>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>
                                    <div className="flex items-center gap-3">
                                        <LazyLoadImage src={Vector2} alt="logo" loading='lazy' />
                                        <span> أضف بـاقتك</span>
                                    </div>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <div className="option-drop-link-app" to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>
                                    <LazyLoadImage src={Vector2} alt="logo" loading='lazy' />
                                    <div className="h3-cont">
                                        <h3>حمل تطبيـقنا الان</h3>
                                        <LazyLoadImage src={round} alt="logo" loading='lazy' />
                                    </div>
                                    <Link to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>
                                        <LazyLoadImage src={apl} alt="logo" loading='lazy' className='img-app' />
                                    </Link>
                                    <Link to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>
                                        <LazyLoadImage src={goog} alt="logo" loading='lazy' className='img-app' />
                                    </Link>
                                </div>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bars-dropdown">
                        <div className="join-cont">
                            <div className="r-s">
                                <span>إنضم إليــنا</span>
                                <div className='sea-word'>
                                    <span className='plus'>+</span>
                                    <span>SEA</span>
                                </div>
                            </div>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dropdown-menu-content" align="start">
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <LoginDialog mainHeader />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to="/add-house">أضف سكنـك</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>أضف بــاقتك</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to="/packages">بـــاقات حــول العـالم</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <NavLink className="option-drop-link " to="/packages">تســـوق معنــا</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                <a className="option-drop-link " href="#contactusinfos">حمل التطبيـــق من هنا</a>
                            </DropdownMenuItem>
                        <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                            <NavLink className="option-drop-link " to='/hotels'>فــنادق وشقــق</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                            <NavLink className="option-drop-link " to='/packages'>باقــات حـول العالم</NavLink>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                                        <NavLink className="option-drop-link " to='/privite-tours'>النقل و المــواصلات</NavLink>
                                    </DropdownMenuItem> */}
                        <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                            <NavLink className="option-drop-link " to='/previsa'>التــأشيــرات</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                            <NavLink className="option-drop-link " to='/table'>جدولك علينا</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full p-0 m-0 flex items-center justify-center">
                            <NavLink className="option-drop-link " to='/blogs'>المدونـة</NavLink>
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
                    <NavLink to='/previsa'>التــأشيــرات</NavLink>
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