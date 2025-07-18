// components/AccountLayout.jsx
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Breadcrumbs from "../components/home/BreadCrumbs";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BsBagHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useEffect } from 'react';


export default function AccountLayout() {
    //if not login redirect to login
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }
    }, []);
    return (

        <div>
            <Header />
            <div className="container">
                <div className="mb-8">
                    <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "الملف الشخصي", href: "/account/profile" }]} />
                </div>
                <div className="layout-cont">
                    <aside className='accout-aside'>
                        <nav>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li><NavLink to="profile"><span>الملف الشخصي</span> <FaUserAlt /></NavLink></li>
                                <li><NavLink to="reservations"><span>حجــوزاتي</span> <HiOutlineBars3BottomRight /></NavLink></li>
                                <li><NavLink to="favorites"><span>مفضلتي</span> <BsBagHeartFill /></NavLink></li>
                                <li><NavLink to="logout">Log Out <RiLogoutCircleRLine /></NavLink></li>
                            </ul>
                        </nav>
                    </aside>
                    <main style={{ flexGrow: 1, }}>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
