'use client'
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const firstStepStore = async (data, setLoading, setStep, step) => {
    const token = sessionStorage.getItem('token');
    setLoading(true); // Set loading state    
    const formData = new FormData();
    formData.append('house_type_id', data.type);
    // formData.append('main_activity_item_ids[]', data.details);
    for (let key in data.details) {
        formData.append('main_activity_item_ids[]', data.details[key]);
    }
    formData.append('lat', data.address.latitude);
    formData.append('lng', data.address.longitude);
    formData.append('map_desc', data.address.label);
    formData.append('address_name', data.address.label);
    formData.append('address_city', data.address.city);
    formData.append('address', data.address.street);
    formData.append('zip_code', data.address.postalCode);
    formData.append('area', data.address.region);


    const headers = {
        'Accept-Language': 'ar',
        Authorization: `Bearer ${token}`
    }
    const url = `${API_BASE_URL}/first-step-housing-unit-store`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: headers,
        });
        const message = response?.data?.message || 'Profile updated successfully';
        if (response.data.status === true) {
            toast.success(message, {
            })
            setLoading(false); // Reset loading state
            setStep(step + 1);
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
        }); setLoading(false); // Reset loading state
    }
};






