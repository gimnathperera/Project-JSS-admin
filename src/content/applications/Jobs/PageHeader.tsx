import { Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const navigate = useNavigate();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          All Jobs
        </Typography>
        <Typography variant="subtitle2">Description about the page</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => navigate('/dashboards/create-job')}
        >
          Create a new job
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
