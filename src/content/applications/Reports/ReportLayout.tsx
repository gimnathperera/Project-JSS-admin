import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import ReportTable from './ReportTable';

import { fetchAllReports } from '../../../store/actions/report.action';

function ReportLayout() {
  const dispatch = useDispatch();
  const reportList = useSelector(({ report }: RootStateOrAny) => report.list);

  useEffect(() => {
    dispatch(fetchAllReports());
  }, []);

  return (
    <>
      {reportList?.length > 0 ? (
        <Card>
          <ReportTable reports={reportList} />
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

export default ReportLayout;
