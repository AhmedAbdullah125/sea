import apiClient from '../clients/axios';

export const fetchFromApi = async (
  url,
  { method = 'GET', headers = {}, body = null, params = null } = {}
) => {
  try {
    const response = await apiClient({
      url,
      method,
      headers,
      data: body,
      params,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: `Error ${error.response.status}: ${error.response.data?.message || 'Request failed'}`,
        status: error.response.status,
      };
    }

    if (error.request) {
      return {
        success: false,
        error: 'No response from server. Check your connection.',
        status: null,
      };
    }

    return {
      success: false,
      error: error.message || 'Something went wrong',
      status: null,
    };
  }
};
