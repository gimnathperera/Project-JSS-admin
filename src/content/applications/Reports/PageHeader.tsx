import { Typography, Button, Grid } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

function PageHeader() {
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
          startIcon={<LocalPrintshopIcon fontSize="small" />}
        >
          Print Report
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
