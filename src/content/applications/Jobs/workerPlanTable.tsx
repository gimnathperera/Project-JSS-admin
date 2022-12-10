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

  const renderDayOfWeek = (day) => {
    switch (day) {
      case 7 : {
        return 'Sunday';
      }
      case 1 : {
        return 'Monday';
      }
      case 2 : {
        return 'Tuesday';
      }
      case 3 : {
        return 'Wednesday';
      }
      case 4 : {
        return 'Thursday';
      }
      case 5 : {
        return 'Friday';
      }
      case 6 : {
        return 'Saturday';
      }
    }
  };
  const paginatedWorkerPlans = applyPagination(workerPlanList, page, limit);

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Worker name</TableCell>
              <TableCell align="center">Worker email</TableCell>
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
                      {site?.worker_name || '-'}
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
                      {site?.worker_email || '-'}
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
                      {renderDayOfWeek(site?.day_of_week) || '-'}
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
