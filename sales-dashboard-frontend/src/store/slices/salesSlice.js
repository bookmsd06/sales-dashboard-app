import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { salesAPI, formatDateForAPI } from '../../services/api';

// uploading file
export const uploadSalesFile = createAsyncThunk(
  'sales/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const response = await salesAPI.uploadFile(file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch all apis for dashboard data
export const fetchDashboardData = createAsyncThunk(
  'sales/fetchDashboardData',
  async (filters = {}, { rejectWithValue, dispatch }) => {
    try {
      const apiFilters = {
        ...filters,
        startDate: formatDateForAPI(filters.dateRange?.start),
        endDate: formatDateForAPI(filters.dateRange?.end)
      };

      delete apiFilters.dateRange;

      const [summaryResponse, filteredResponse, trendResponse] = await Promise.all([
        salesAPI.getSalesAndRevenue({
          startDate: apiFilters.startDate,
          endDate: apiFilters.endDate
        }),
        salesAPI.getFilteredSales(apiFilters),
        salesAPI.getSalesTrend({
          startDate: apiFilters.startDate,
          endDate: apiFilters.endDate
        })
      ]);

      const transformedData = transformApiData(
        summaryResponse.data,
        filteredResponse.data,
        trendResponse.data
      );

      return transformedData;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transformApiData = (summaryData, filteredData, trendData) => {
  // trend data for revenue trend chart
  const revenueTrend = (trendData.monthly || []).map(month => ({
    month: month._id ? month._id.split('-')[1] : 'Unknown',
    revenue: month.totalRevenue || 0,
    sales: month.totalSales || 0
  }));

  // filtered data for product sales chart
  const productSalesMap = {};
  (filteredData.data || []).forEach(item => {
    if (!productSalesMap[item.product]) {
      productSalesMap[item.product] = {
        product: item.product,
        sales: 0,
        revenue: 0
      };
    }
    productSalesMap[item.product].sales += item.quantity || 0;
    productSalesMap[item.product].revenue += item.revenue || 0;
  });
  const productSales = Object.values(productSalesMap);

  // filtered data for region revenue chart
  const regionRevenueMap = {};
  (filteredData.data || []).forEach(item => {
    if (!regionRevenueMap[item.region]) {
      regionRevenueMap[item.region] = {
        region: item.region,
        revenue: 0,
        sales: 0
      };
    }
    regionRevenueMap[item.region].revenue += item.revenue || 0;
    regionRevenueMap[item.region].sales += item.quantity || 0;
  });
  const regionRevenue = Object.values(regionRevenueMap);

  return {
    summary: summaryData.data,
    rawData: filteredData.data,
    count: filteredData.count,
    revenueTrend,
    productSales,
    regionRevenue,
    trendData: trendData
  };
};

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    revenueTrend: [],
    productSales: [],
    regionRevenue: [],
    rawData: [],
    summary: null,
    count: 0,
    trendData: null,
    filters: {
      dateRange: { 
        start: null, 
        end: null,
      },
      category: '',
      region: '',
      product: ''
    },
    loading: false,
    error: null,
    uploadStatus: 'idle',
    lastUpdated: null
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUploadStatus: (state) => {
      state.uploadStatus = 'idle';
    },
    resetData: (state) => {
      state.revenueTrend = [];
      state.productSales = [];
      state.regionRevenue = [];
      state.rawData = [];
      state.summary = null;
      state.count = 0;
      state.trendData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // upload file cases
      .addCase(uploadSalesFile.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadSalesFile.fulfilled, (state, action) => {
        state.uploadStatus = 'success';
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(uploadSalesFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload;
      })
      
      // dashboard data cases
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueTrend = action.payload.revenueTrend;
        state.productSales = action.payload.productSales;
        state.regionRevenue = action.payload.regionRevenue;
        state.rawData = action.payload.rawData;
        state.summary = action.payload.summary;
        state.count = action.payload.count;
        state.trendData = action.payload.trendData;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearError, clearUploadStatus, resetData } = salesSlice.actions;
export default salesSlice.reducer;