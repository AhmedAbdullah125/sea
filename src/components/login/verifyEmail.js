'use client'
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const verifyEmail = async (data, phone, setLoading,navigate) => {
    setLoading(true); // Set loading state    
    const formData = new FormData();
    formData.append('email', phone);
    formData.append('otp', data.otp);
    const headers = {
        'Accept-Language': 'ar',
    }
    const url = `${API_BASE_URL}/verify-otp`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: headers,
        });
        const message = response?.data?.message || 'Profile updated successfully';
        if (response.data.status === true) {            
            toast.success(message, {
            })
            setLoading(false); // Reset loading state
            sessionStorage.setItem("token", response.data.data.token);
            navigate("/")
        }
        else {      
            toast(response?.data?.status, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
            setLoading(false); // Reset loading state
        }
    } catch (error) {
            toast(error?.response?.data?.message, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });        
            setLoading(false); // Reset loading state
    }
};



