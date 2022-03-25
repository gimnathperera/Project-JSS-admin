import { Typography, Button, Grid } from '@mui/material';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useDispatch } from 'react-redux';

import { downloadCSV } from '../../../store/actions/common.actions';

function PageHeader() {
  const dispatch = useDispatch();

  const handleDownloadCSV = () => {
    dispatch(downloadCSV());
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          All Reports
        </Typography>
        <Typography variant="subtitle2">All reports details</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<SimCardDownloadIcon fontSize="small" />}
          onClick={handleDownloadCSV}
        >
          Download as CSV
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
