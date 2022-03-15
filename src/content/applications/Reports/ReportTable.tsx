import { FC, ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

import Label from 'src/components/Label';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import { getWorkingHours, convertTimeValue } from 'src/common/functions';
import moment from 'moment';

interface ReportTableProps {
  reports?: any[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const ReportTable: FC<ReportTableProps> = ({ reports }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedJobs, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedJobs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: '1',
      name: 'Active'
    },
    {
      id: '0',
      name: 'Inactive'
    }
  ];

  const getStatusLabel = (
    cryptoOrderStatus: CryptoOrderStatus
  ): JSX.Element => {
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

    const { text, color }: any = map[cryptoOrderStatus];

    return <Label color={color}>{text}</Label>;
  };

  const applyFilters = (_jobs: any, filters: Filters): any => {
    return _jobs.filter((job) => {
      let matches = true;

      if (filters.status && job.status !== Number(filters.status)) {
        matches = false;
      }

      return matches;
    });
  };

  const applyPagination = (_jobs: any, page: number, limit: number): any => {
    return _jobs.slice(page * limit, page * limit + limit);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = applyFilters(reports, filters);

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const handleDetailedClick = (jobId: string) => {
    // navigate(`/app/job/${jobId}`);
  };

  return (
    <Card>
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Completed Jobs"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Worker Name</TableCell>
              <TableCell align="center">Job Name</TableCell>
              <TableCell align="center">Assigned Start / End</TableCell>
              <TableCell align="center">Actual Start / End</TableCell>
              <TableCell align="center">Geo Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report: any) => {
              console.log('>>===>> >>===>> report', report);
              const isReportSelected = selectedJobs.includes(report.id);

              return (
                <TableRow hover key={report.id} selected={isReportSelected}>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '15px',
                        justifyContent: 'center'
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          align="left"
                        >
                          {moment(report?.created_at).format('YYYY-MM-DD') ||
                            '-'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {report?.worker_name || '-'}
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
                      {report?.job_name || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {convertTimeValue(report?.job_shift_start_time) || '-'} -{' '}
                      {convertTimeValue(report?.job_shift_end_time) || '-'}
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
                      {convertTimeValue(report?.worker_shift_start_time) || '-'}{' '}
                      - {convertTimeValue(report?.worker_shift_end_time) || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View detail report" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#5569FF'
                        }}
                        color="inherit"
                        size="small"
                      >
                        <ZoomOutMapIcon />
                      </IconButton>
                    </Tooltip>
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
          count={filteredReports.length}
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

export default ReportTable;
