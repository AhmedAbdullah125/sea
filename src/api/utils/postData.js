import apiClient from '../clients/axios';

export const postToApi = async (
  url,
  body = {},
  { headers = {}, params = null } = {}
) => {
  try {
    const response = await apiClient.post(url, body, {
      headers,
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
