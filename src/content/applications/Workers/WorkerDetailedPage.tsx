import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Box, Container, CircularProgress } from '@mui/material';

import Footer from 'src/components/Footer';
import WorkerEditTab from './WorkerEditTab';

import { fetchUserById } from '../../../store/actions/worker.actions';

const ManagementUserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const _worker = useSelector(
    ({ worker }: RootStateOrAny) => worker.currentWorker
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, []);

  return (
    <>
      <Helmet>
        <title>Worker Details - Management</title>
      </Helmet>

      <Container sx={{ mt: 3 }} maxWidth="lg">
        {loading ? (
          <Box
            sx={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={64} disableShrink thickness={3} />
          </Box>
        ) : (
          <WorkerEditTab _worker={_worker} />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default ManagementUserProfile;
