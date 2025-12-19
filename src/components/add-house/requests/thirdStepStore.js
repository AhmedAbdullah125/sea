'use client'
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const thirdStepStore = async (data, setLoading, setStep, setp, setShowSuccess) => {
    const token = localStorage.getItem('token');
    setLoading(true); // Set loading state    
    const formData = new FormData();
    // formData.append('main_activity_item_ids[]', data.details);
    for (let key in data.features) {
        formData.append('main_feature_item_ids[]', data.features[key]);
    }
    for (let key in data.images) {
        formData.append('images[]', data.images[key].file);
    }
    formData.append('title', data.title);
    formData.append('what_special', data.highlight);
    formData.append('price_for_night', data.priceNight);
    formData.append('price_for_week', data.priceWeek);
    formData.append('price_for_month', data.priceMonth);
    formData.append('book_type', data.contactType);
    formData.append('country', data.country);
    formData.append('city', data.city);
    formData.append('street', data.street);
    formData.append('district', data.district);
    formData.append('id_or_passport', data.idNumber);
    formData.append('age', data.age);



    const headers = {
        'Accept-Language': 'ar',
        Authorization: `Bearer ${token}`
    }
    const url = `${API_BASE_URL}/third-step-housing-unit-store`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: headers,
        });
        const message = response?.data?.message || 'Profile updated successfully';
        if (response.data.status === true) {
            toast.success(message, {
            })
            setLoading(false); // Reset loading state
            setShowSuccess(true);
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






