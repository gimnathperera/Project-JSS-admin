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

const JobWokerTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const jobWorkerList = useSelector(
    ({ jobWorker }: RootStateOrAny) => jobWorker.list
  );

  const getStatusLabel = (customerStatus: any): JSX.Element => {
    const map = {
      '1': {
        text: 'Active',
        color: 'success'
      },
      '0': {
        text: 'Inactive',
        color: 'warning'
      }
    };

    const { text, color }: any = map[customerStatus];

    return <Label color={color}>{text}</Label>;
  };

  const applyPagination = (
    _jobWorkers: any,
    page: number,
    limit: number
  ): any => {
    return _jobWorkers.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const paginatedJobWorkers = applyPagination(jobWorkerList, page, limit);

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Worker Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Assign Alias</TableCell>
              <TableCell align="center">Certification Exp</TableCell>
              <TableCell align="center">Time Duration</TableCell>
              <TableCell align="center">Working Dates</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobWorkers?.map((site: any) => {
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
                      {site?.name || '-'}
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
                      {site?.email || '-'}
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
                      {site?.contact_number || '-'}
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
                      {site?.assign_alias || '-'}
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
                      {site?.certificate_expire_date || '-'}
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
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.start_date || '-'}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {site?.end_date || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(site?.status)}
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
          count={jobWorkerList.length}
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

export default JobWokerTable;
