import axios from 'axios';

// axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An error occurred';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || 'Server error';
    } else if (error.request) {
      errorMessage = 'Network error. Please check your connection';
    } else {
      errorMessage = error.message;
    }
    
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const salesAPI = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    });

    return response;
  },

  getSalesAndRevenue: async (params = {}) => {
    const response = await apiClient.get('/sales/saleAndRevenue', {
      params
    });
    return response;
  },


  getFilteredSales: async (filters = {}) => {
    // remove empty filters
    // const validFilters = Object.fromEntries(
    //   Object.entries(filters).filter(([_, value]) => 
    //     value !== '' && value !== null && value !== undefined
    //   )
    // );

    const response = await apiClient.get('/sales/filter', {
      params: filters
    });
    return response;
  },


  getSalesTrend: async (params = {}) => {
    const response = await apiClient.get('/sales/trend',{
      params
    });
    return response;
  }
};

export const formatDateForAPI = (date) => {
  if (!date) return null;
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};