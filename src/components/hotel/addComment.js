import axios from 'axios';
import { toast } from 'sonner';

export const addComment = async (API_BASE_URL, payload, setLoading,trigger, setTrigger,setActiveTab) => {
    //getting token from session storage

    setLoading(true); // Set loading state
    const url = `${API_BASE_URL}/hotel-comment`; // API endpoint   
    try {
        // Prepare the request payload
        const queryParams = { comment: payload.comment, rating: payload.rate, hotel_id: payload.data.id, };
        const response = await axios({
            method: 'post', url: url, data: queryParams,
            headers: { lang: localStorage.getItem('lang') || 'en', Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
        });
        setLoading(false); // Reset loading state
        // Get message from response        
        const message = response?.data?.message || 'Operation successful';
        if (response.data?.status === true) {
            // Success toast notification
            toast.success(message, { });
            setTrigger(!trigger)
            setActiveTab(2)
        } else {
            // Handle unexpected responses
            toast('Unexpected response', { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
        }
    } catch (error) {
        setLoading(false); // Reset loading state
        // Log the error for debugging
        console.error(error);
        // Extract error message from response
        const errorMessage = error?.response?.data?.message || error.message || 'An unknown error occurred';
        // Display error toast notification
        toast(errorMessage, { style: { borderColor: "#dc3545", boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)', }, });
    }
};
