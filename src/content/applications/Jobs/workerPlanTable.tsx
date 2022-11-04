import { FC, ChangeEvent, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import {
  Divider,
  Box,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@mui/material';

import Label from 'src/components/Label';

interface RecentOrdersTableProps {}

const WorkerPlanTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const workerPlanList = useSelector(
    ({ workerPlan }: RootStateOrAny) => workerPlan.list
  );

//   const getStatusLabel = (customerStatus: any): JSX.Element => {
//     const map = {
//       '1': {
//         text: 'Active',
//         color: 'success'
//       },
//       '0': {
//         text: 'Inactive',
//         color: 'warning'
//       }
//     };

//     const { text, color }: any = map[customerStatus];

//     return <Label color={color}>{text}</Label>;
//   };

  const applyPagination = (
    _workerPlans: any,
    page: number,
    limit: number
  ): any => {
    return _workerPlans.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const paginatedWorkerPlans = applyPagination(workerPlanList, page, limit);

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Job Id</TableCell>
              <TableCell align="center">Worker Id</TableCell>
              <TableCell align="center">Day of Week</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkerPlans?.map((site: any) => {
              return (
                <TableRow hover key={site.id}>
                  
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.job_id || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.worker_id || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.day_of_week || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.start_time || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.end_time || '-'}
                    </Typography>

                  </TableCell>  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={workerPlanList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default WorkerPlanTable;
