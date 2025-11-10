import { Paper, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const RegionRevenueChart = ({ data, title = "Revenue Distribution by Region" }) => {
  const chartOptions = {
    chart: {
      type: 'pie',
      height: 350,
      toolbar: { show: false }
    },
    labels: data.map(item => item.region),
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
    legend: {
      position: 'bottom'
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chartSeries = data.map(item => item.revenue);

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {data.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={350}>
          <Typography color="text.secondary">
            No region revenue data available
          </Typography>
        </Box>
      ) : (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          height={350}
        />
      )}
    </Paper>
  );
};

export default RegionRevenueChart;