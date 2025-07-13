import React , { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../public/home/seaLogo.svg'
import LoginDialog from '../login/LoginDialog'

import axios from 'axios'
import { API_BASE_URL } from '../../lib/apiConfig'


const MainHeader = () => {



    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
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
    return (
        <section className='main-header-cont'>
            <div className="container upper-nav-cont">
                <div className="r-links">
                    <NavLink to="/add-house">أضف سكنـك</NavLink>
                    <NavLink to={`https://wa.me/${data.whatsapp}?text=اريد مناقشتكم لإضافه باقتي`}>أضف بــاقتك</NavLink>
                    <NavLink to="/packages">بـــاقات حــول العـالم</NavLink>
                </div>
                <div className="logo">
                    <Link to="/">
                        <LazyLoadImage src={logo} alt="logo" loading='lazy' />
                    </Link>
                </div>
                <div className="l-links">
                    <LoginDialog  mainHeader/>

                    <NavLink to="/packages">تســـوق معنــا</NavLink>
                    <a href="#contactusinfos">حمل التطبيـــق من هنا</a>
                </div>
            </div>
            <div className="container lower-nav-cont">
                <div className="main-links">
                    <NavLink to='/'>الرئيسية</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/hotels'>فــنادق وشقــق</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/packages'>باقــات حـول العالم</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/privite-tours'>النقل و المــواصلات</NavLink>
                    <div className="noqta"></div>
                    <NavLink to='/visa'>التــأشيــرات</NavLink>
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
