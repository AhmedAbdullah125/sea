import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from "date-fns";

export const bookHotel = async (data, setLoading,id) => {    
    setLoading(true); // Set loading state
    console.log(id);

    function formatDate(date) {
        return format(date, "yyyy-MM-dd HH:mm:ss");
    }
    const formData = new FormData();
    formData.append('departure_date', formatDate(data.dateLeave));
    formData.append('check_in_date', formatDate(data.date));
    formData.append('number_of_person', data.visitors);
    formData.append('hotel_id', id);

    const url = `${API_BASE_URL}/hotels-booking`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        setLoading(false); // Reset loading state

        if (response.status === 200 || response.status === 201) {
            const message = response.data?.message || 'Profile updated successfully';
            toast.success(message, );
            console.log("ssss");
            window.location.href = '/paymentMaintenance';

        } else {
            const unexpectedMessage = response.data?.message || 'Unexpected response';
            toast(unexpectedMessage, { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
        }
    } catch (error) {
        setLoading(false); // Reset loading state
        console.error('Profile update error:', error);
        const errorMessage = error?.response?.data?.message || error.message || 'An unknown error occurred';
        toast(errorMessage, { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
    }
};
