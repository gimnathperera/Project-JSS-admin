import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container justifyContent="left" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Job Details
        </Typography>
        <Typography variant="subtitle2">Update Customer Details</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
