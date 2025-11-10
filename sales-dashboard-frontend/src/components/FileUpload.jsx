import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Button,
  Box,
  LinearProgress,
  Alert,
  Grid
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { uploadSalesFile } from '../store/slices/salesSlice';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = () => {
  const dispatch = useDispatch();
  const { uploadStatus, error } = useSelector(state => state.sales);
  const summaryData = useSelector(state => state.sales.summary);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadSalesFile(file));
    }
  }, [dispatch]);

  return (
     <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 3 }} >
          <Typography variant="h6" gutterBottom>
            Upload File
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUpload />}
              disabled={uploadStatus === 'loading'}
            >
              Upload CSV/Excel
              <VisuallyHiddenInput
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Supports .csv, .xlsx, .xls files (max 10MB)
            </Typography>
          </Box>

          {uploadStatus === 'loading' && (
            <LinearProgress sx={{ mt: 2 }} />
          )}

          {uploadStatus === 'success' && (
            <Alert severity="success" sx={{ mt: 2 }}>
              File uploaded and processed successfully!
            </Alert>
          )}
          
        </Paper>
      </Grid>
      <Grid item xs={4} md={4}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sales Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Sales: <strong>{summaryData?.totalSales}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Revenue: <strong>{summaryData?.totalRevenue}</strong>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FileUpload;