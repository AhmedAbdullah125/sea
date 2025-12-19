'use client'
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const secondStepStore = async (data, setLoading, setStep, setp) => {
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
    formData.append('guests_numbers', data.guests);
    formData.append('bedrooms_numbers', data.bedrooms || 0);
    formData.append('children_numbers', data.children || 0);
    formData.append('beds_numbers', data.beds || 0);
    formData.append('bathrooms_numbers', data.bathrooms || 0);


    const headers = {
        'Accept-Language': 'ar',
        Authorization: `Bearer ${token}`
    }
    const url = `${API_BASE_URL}/second-step-housing-unit-store`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: headers,
        });
        const message = response?.data?.message || 'Profile updated successfully';
        if (response.data.status === true) {
            toast.success(message, {
            })
            setLoading(false); // Reset loading state
            setStep(setp + 1);
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






