import { FC, ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
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
import { useSelector, RootStateOrAny } from 'react-redux';

import Label from 'src/components/Label';
import Modal from 'src/components/Modal';
import UpdateJobForm from './UpdateJobForm';
import BulkActions from './BulkActions';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders?: CryptoOrder[];
  jobs?: any[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const JobTable: FC<RecentOrdersTableProps> = ({ jobs }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const [selectedJobs, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedJobs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedWorkers(event.target.checked ? jobs.map((job) => job.id) : []);
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedJobs.includes(cryptoOrderId)) {
      setSelectedWorkers((prevSelected) => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedWorkers((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleEditWorker = (job: any) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const filteredJobs = applyFilters(jobs, filters);

  const paginatedJobs = applyPagination(filteredJobs, page, limit);

  const selectedSomeJobs =
    selectedJobs.length > 0 && selectedJobs.length < jobs.length;

  const selectedAllCryptoOrders = selectedJobs.length === jobs.length;

  const handleDetailedClick = (jobId: string) => {
    navigate(`/app/job/${jobId}`);
  };

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
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
          title="Jobs"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeJobs}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell> */}
              <TableCell align="center">Job Name</TableCell>
              <TableCell align="center">Job Type</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Company Site</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobs.map((job: any) => {
              const isWorkerSelected = selectedJobs.includes(job.id);

              return (
                <TableRow hover key={job.id} selected={isWorkerSelected}>
                  {/* <TableCell padding="checkbox" align="right">
                    <Checkbox
                      color="primary"
                      checked={isWorkerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, job.id)
                      }
                      value={isWorkerSelected}
                    />
                  </TableCell> */}
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
                        <Button onClick={() => handleDetailedClick(job?.id)}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            align="left"
                          >
                            {job?.name || '-'}
                          </Typography>
                        </Button>
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
                      {job?.job_type || '-'}
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
                      {job?.company || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {job?.site || '-'}
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
                      {job?.start_date || '-'}
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
                      {job?.end_date || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(job.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit job" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#5569FF'
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEditWorker(job)}
                      >
                        <EditTwoToneIcon />
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
          count={filteredJobs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Modal
        isOpen={modalOpen}
        handleClose={handleModalClose}
        content={
          <UpdateJobForm onSuccess={handleModalClose} formData={selectedJob} />
        }
        modalHeader={'Update Job'}
        modalDescription={
          'Fill the forum and press submit button to update job.'
        }
      />
    </Card>
  );
};

export default JobTable;
