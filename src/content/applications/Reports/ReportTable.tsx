import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  Card,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  CardHeader,
  TextField
} from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CachedIcon from '@mui/icons-material/Cached';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Papa from 'papaparse';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import Label from 'src/components/Label';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import {
  getWorkingHours,
  convertTimeValue,
  isLocationVerified
} from 'src/common/functions';
import moment from 'moment';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import { resetCSV } from 'src/store/actions/common.actions';
interface ReportTableProps {
  reports?: any[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const ReportTable: FC<ReportTableProps> = ({ reports }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDownload = useSelector(
    ({ common }: RootStateOrAny) => common.isDownload
  );

  const [selectedJobs, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedJobs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [newSearch, setNewSearch] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>(null);

  useEffect(() => {
    if (isDownload && paginatedReports.length > 0) {
      downloadCSV({
        filename: `jss_worker_report_${new Date().toJSON().slice(0, 10)}.csv`,
        data: paginatedReports,
        columns: Object.keys(paginatedReports[0])
      });
    }
    dispatch(resetCSV());
  }, [isDownload]);

  const applyFilters = (_reports: any, newSearch: string): any => {
    return _reports.filter((report: any) => {
      let matches = false;

      if (report.worker_name.toLowerCase().includes(newSearch.toLowerCase())) {
        matches = true;
      }
      if (
        dateFilter &&
        dateFilter !== moment(report?.created_at).format(DATE_FORMAT)
      ) {
        matches = false;
      }
      return matches;
    });
  };

  const applyPagination = (_jobs: any, page: number, limit: number): any => {
    return _jobs.slice(page * limit, page * limit + limit);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewSearch(e.target.value);
  };

  const handleDateChange = (e: string): void => {
    setDateFilter(moment(e).format(DATE_FORMAT));
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = applyFilters(reports, newSearch);

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const getStatusLabel = (isVerified: Boolean): JSX.Element => {
    return (
      <Label color={isVerified ? 'success' : 'error'}>
        {isVerified ? 'With In Distance Range' : 'Not With In Distance Range'}
      </Label>
    );
  };

  const downloadCSV = (args: any) => {
    let filename = args.filename || 'export.csv';
    let columns = args.columns || null;

    let csv = Papa.unparse({ data: args.data, fields: columns });
    if (csv == null) return;

    var blob = new Blob([csv]);
    if ((window.navigator as any).msSaveOrOpenBlob)
      (window.navigator as any).msSaveBlob(blob, args.filename);
    else {
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card>
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 2
              }}
            >
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Search By Worker"
                  variant="outlined"
                  onChange={handleSearch}
                  value={newSearch}
                />
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Search By Date"
                  value={dateFilter}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Tooltip title="Refresh filters" arrow>
                <IconButton
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: '#5569FF'
                  }}
                  color="inherit"
                  size="small"
                  onClick={() => window.location.reload()}
                >
                  <CachedIcon />
                </IconButton>
              </Tooltip>
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
              <TableCell align="center">Site Location</TableCell>
              <TableCell align="center">Geo Location Verification</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report: any) => {
              const isReportSelected = selectedJobs.includes(report.id);
              const assignedLocation = {
                latitude: report?.site_latitude,
                longitude: report?.site_longitude
              };

              const actualLocation = {
                latitude: report?.worker_shift_start_latitude,
                longitude: report?.worker_shift_start_longitude
              };

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
                      sx={{ textTransform: 'capitalize' }}
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
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {`LAT: ${assignedLocation.latitude}` || '-'}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {`LONG: ${assignedLocation.longitude}` || '-'}
                    </Typography>
                  </TableCell>
                  <Tooltip
                    title={`Actual Location; Lat: ${report?.worker_shift_start_latitude} & Long: ${report?.worker_shift_start_longitude}`}
                    arrow
                  >
                    <TableCell align="center">
                      {getStatusLabel(
                        isLocationVerified(assignedLocation, actualLocation)
                      )}
                    </TableCell>
                  </Tooltip>
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
