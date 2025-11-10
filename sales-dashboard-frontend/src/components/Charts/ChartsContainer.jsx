import { useSelector } from 'react-redux';
import { Grid, Box, CircularProgress, Alert } from '@mui/material';
import RevenueTrendChart from './RevenueTrendChart';
import ProductSalesChart from './ProductSalesChart';
import RegionRevenueChart from './RegionRevenueChart';

const ChartsContainer = () => {
  const { revenueTrend, productSales, regionRevenue, loading, error } = useSelector(state => state.sales);
  console.log(revenueTrend, "REVNE RTEN")

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Grid item xs={12}>
        <RevenueTrendChart data={revenueTrend} />
      </Grid>
      <br />
      <Grid item xs={12} md={8}>
        <ProductSalesChart data={productSales} />
      </Grid>
      <br />
      <Grid item xs={12} md={4}>
        <RegionRevenueChart data={regionRevenue} />
      </Grid>
    </Box>
  );
};

export default ChartsContainer;