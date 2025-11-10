import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
   FormControl, InputLabel, Select,
   OutlinedInput,
   InputAdornment,
   IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { setFilters, fetchDashboardData } from '../store/slices/salesSlice';
import ClearIcon from '@mui/icons-material/Clear';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters, loading } = useSelector(state => state.sales);

  const handleFilterChange = (field, value) => {
    dispatch(setFilters({ [field]: value }));
  };

  const handleDateChange = (field, date) => {
    dispatch(setFilters({ 
      dateRange: { 
        ...filters.dateRange, 
        [field]: date 
      } 
    }));
  };

  const handleApplyFilters = () => {
    dispatch(fetchDashboardData(filters));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: { 
        start: null, 
        end: null 
      },
      category: '',
      region: '',
      product: ''
    };
    dispatch(setFilters(clearedFilters));
    dispatch(fetchDashboardData(clearedFilters));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={filters.dateRange.start}
              onChange={(date) => handleDateChange('start', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              maxDate={filters.dateRange.end}
              views={['year', 'month', 'day']}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              value={filters.dateRange.end}
              onChange={(date) => handleDateChange('end', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={filters.dateRange.start}
              views={['year', 'month', 'day']}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl 
              fullWidth 
              sx={{
                minWidth: 150,
                flexGrow: 1,
              }}
            >
              <InputLabel>Product</InputLabel>
              <Select
                value={filters.product || ''}
                label="Product"
                onChange={(e) => handleFilterChange('product', e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      minWidth: 'max-content',
                      width: 'auto',
                    },
                  },
                }}
                input={
                  <OutlinedInput
                    label="Product"
                    sx={{ pr: 3}}
                    endAdornment={
                      filters.product ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterChange('product', '');
                            }}
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                }
              >
                {['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Smartwatch'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl 
              fullWidth 
              sx={{
                minWidth: 150,
                flexGrow: 1,
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category || ''}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      minWidth: 'max-content',
                      width: 'auto',
                    },
                  },
                }}
                input={
                  <OutlinedInput
                    label="Category"
                    sx={{ pr: 3}}
                    endAdornment={
                      filters.category ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterChange('category', '');
                            }}
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                }
              >
                {['Electronics', 'Wearables', 'Accessories'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl 
              fullWidth 
              sx={{
                minWidth: 150,
                flexGrow: 1,
              }}
            >
              <InputLabel>Region</InputLabel>
              <Select
                value={filters.region || ''}
                label="Region"
                onChange={(e) => handleFilterChange('region', e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      minWidth: 'max-content',
                      width: 'auto',
                    },
                  },
                }}
                input={
                  <OutlinedInput
                    label="Region"
                    sx={{ pr: 3}}
                    endAdornment={
                      filters.region ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterChange('region', '');
                            }}
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                }
              >
                {['North', 'South', 'East', 'West'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Loading...' : 'Apply'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                disabled={loading}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default Filters;