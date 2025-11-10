import React, { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import { Container, Typography, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchDashboardData } from './store/slices/salesSlice';
import FileUpload from './components/FileUpload';
import Filters from './components/Filters';
import ChartsContainer from './components/Charts/ChartsContainer';
import { formatDateForAPI } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {

  const dispatch = useDispatch();
  const today = new Date();
  const startDate = formatDateForAPI(today);
  const endDate = formatDateForAPI(today);

  useEffect(() => {
    const defaultFilters = {
      dateRange: { 
        start: startDate, 
        end: endDate
      }
    };
    dispatch(fetchDashboardData(defaultFilters));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4 
          }}
        >
          Sales Analytics Dashboard
        </Typography>
        
        <FileUpload />
        <Filters />
        <ChartsContainer />
      </Container>
    </ThemeProvider>
  )
}

export default App
