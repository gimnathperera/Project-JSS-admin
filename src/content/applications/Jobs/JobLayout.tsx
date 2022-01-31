import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import JobTable from './JobTable';

import { fetchJobList } from '../../../store/actions/job.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const jobList = useSelector(({ job }: RootStateOrAny) => job.list);

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  return (
    <>
      {jobList?.length > 0 ? (
        <Card>
          <JobTable jobs={jobList} />
        </Card>
      ) : (
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
      )}
    </>
  );
}

export default RecentOrders;
