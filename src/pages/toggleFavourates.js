import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const toggleFavourates = async (productId, type) => {
    // setLoading(true); // Set loading state
    console.log(productId, type);
    const formData = new FormData();
    formData.append('wishable_id', productId);
    formData.append('wishable_type', type);
    const url = `${API_BASE_URL}/wishlist`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        // setLoading(false); // Reset loading state
        if (response.status === 200) {
            const message = response.data?.message || 'Profile updated successfully';
            toast.success(message, {
            })
        } else {
            const unexpectedMessage = response.data?.message || 'Unexpected response';
            toast(unexpectedMessage, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
        }
    } catch (error) {
        // setLoading(false); // Reset loading state
        console.error('Profile update error:', error);
        const errorMessage = error?.response?.data?.msg || error.message || 'An unknown error occurred';
        toast(errorMessage, {
            style: {
                borderColor: "#dc3545",
                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
            },
        });
    }
};
