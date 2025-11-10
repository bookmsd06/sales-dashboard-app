import { Paper, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const RevenueTrendChart = ({ data, title = "Revenue Trends Over Time" }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true
      },
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth',
      width: [3, 2]
    },
    markers: {
      size: 4
    },
    xaxis: {
      categories: data.map(item => item.month),
      title: {
        text: 'Month'
      }
    },
    yaxis: [
      {
        title: {
          text: 'Revenue ($)'
        },
        labels: {
          formatter: (value) => `$${value.toLocaleString()}`
        }
      },
      {
        opposite: true,
        title: {
          text: 'Sales Count'
        }
      }
    ],
    colors: ['#008FFB', '#00E396'],
    legend: {
      position: 'top'
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          return seriesIndex === 0 ? `$${value.toLocaleString()}` : value.toLocaleString();
        }
      }
    }
  };

  const chartSeries = [
    {
      name: 'Revenue',
      data: data.map(item => item.revenue)
    },
    {
      name: 'Sales Count',
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
            No trend data available
          </Typography>
        </Box>
      ) : (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      )}
    </Paper>
  );
};

export default RevenueTrendChart;