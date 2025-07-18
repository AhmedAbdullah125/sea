import React, { useState, useEffect } from 'react'
import { logOutRequest } from './logOutRequest';
import { API_BASE_URL } from '../lib/apiConfig';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
    //if not login redirect to login
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            toast.error('لم يتم تسجيل الدخول')
            window.location.href = '/login';
        }
    }, []);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        logOutRequest(API_BASE_URL, setLoading, navigate, toast);
    };
    return (
        <div className="reservation-cont flex items-center justify-center" >
            <div className="">
                <h2 className='text-2xl text-center text-main-navy mb-4'>هل تريد تسجيل الخروج</h2>
                <div className="flex gap-2 ">
                    <button className='w-full py-3 rounded-xl text-white btn-yes bg-main-purple' onClick={handleLogout}>نعم</button>
                    <button className='w-full py-3 rounded-xl text-white btn-no bg-primaryColor'>لا</button>
                </div>
            </div>
        </div>
    )
}
