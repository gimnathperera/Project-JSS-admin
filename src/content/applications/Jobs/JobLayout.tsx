import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import JobTable from './JobTable';

import { fetchWorkerList } from '../../../store/actions/worker.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const workerList = useSelector(({ worker }: RootStateOrAny) => worker.list);
  useEffect(() => {
    dispatch(fetchWorkerList());
  }, []);

  return (
    <>
      {workerList?.length > 0 ? (
        <Card>
          <JobTable workers={workerList} />
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
