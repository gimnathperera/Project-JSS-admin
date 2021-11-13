import { Helmet } from 'react-helmet-async';
import CreateJobHeader from './CreateJobHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import CreateJobForm from './CreateJobForm';

const CreateJob = () => {
  return (
    <>
      <Helmet>
        <title>All workers</title>
      </Helmet>
      <PageTitleWrapper maxWidth="lg">
        <CreateJobHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <CreateJobForm />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default CreateJob;
