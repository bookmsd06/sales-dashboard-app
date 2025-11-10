import { Paper, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const ProductSalesChart = ({ data, title = "Product-wise Sales Performance" }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.map(item => item.product)
    },
    yaxis: {
      title: {
        text: 'Sales Units'
      }
    },
    colors: ['#008FFB'],
    tooltip: {
      y: {
        formatter: (value) => `${value} units`
      }
    }
  };

  const chartSeries = [
    {
      name: 'Sales Units',
      data: data.map(item => item.sales)
    }
  ];

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {data.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={350}>
          <Typography color="text.secondary">
            No product sales data available
          </Typography>
        </Box>
      ) : (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      )}
    </Paper>
  );
};

export default ProductSalesChart;