import { FC, ChangeEvent, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  TableContainer,
  Button
} from '@mui/material';
import { CircularProgress } from '@mui/material';

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Label from 'src/components/Label';

import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import BulkActions from './BulkActions';
import { getValidDate } from 'src/common/functions';
import { deleteWorker } from '../../../store/actions/worker.actions';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders?: CryptoOrder[];
  workers?: any[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const WorkerTable: FC<RecentOrdersTableProps> = ({ workers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedWorkers.length > 0;
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

  const applyFilters = (_workers: any, filters: Filters): any => {
    return _workers.filter((worker) => {
      let matches = true;

      if (filters.status && worker.status !== Number(filters.status)) {
        matches = false;
      }

      return matches;
    });
  };

  const applyPagination = (_workers: any, page: number, limit: number): any => {
    return _workers.slice(page * limit, page * limit + limit);
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
    setSelectedWorkers(
      event.target.checked ? workers.map((worker) => worker.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedWorkers.includes(cryptoOrderId)) {
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

  const handleDeleteWorker = (worker: any) => {
    try {
      dispatch(deleteWorker(worker));
    } catch (err) {}
  };

  const filteredWorkers = applyFilters(workers, filters);

  const paginatedWorkers = applyPagination(filteredWorkers, page, limit);

  const selectedSomeWorkers =
    selectedWorkers.length > 0 && selectedWorkers.length < workers.length;

  const selectedAllCryptoOrders = selectedWorkers.length === workers.length;
  const theme = useTheme();

  const handleDetailedClick = (workerId: string) => {
    navigate(`/app/worker/${workerId}`);
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
          title="Workers"
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
                  indeterminate={selectedSomeWorkers}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell> */}
              <TableCell align="center">Worker Details</TableCell>
              <TableCell align="center">Employee Number</TableCell>
              <TableCell align="center">Assign Alias</TableCell>
              <TableCell align="center">Additional Info</TableCell>
              <TableCell align="center">Date Of Birth</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Certification</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkers.map((worker: any) => {
              const isWorkerSelected = selectedWorkers.includes(worker.id);

              return (
                <TableRow hover key={worker.id} selected={isWorkerSelected}>
                  {/* <TableCell padding="checkbox" align="right">
                    <Checkbox
                      color="primary"
                      checked={isWorkerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, worker.id)
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
                        <Button onClick={() => handleDetailedClick(worker.id)}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            align="left"
                          >
                            {worker.name}
                          </Typography>
                        </Button>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          align="left"
                        >
                          {worker.email}
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
                      {worker.employee_number}
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
                      {worker.assign_alias}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {worker.additional_info}
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
                      {getValidDate(worker.dob)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {worker.address}
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
                      {worker.contact_number}
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
                      {worker.certificate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {`EXP: ${getValidDate(worker.certificate_expire_date)}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(worker.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Active/Inactive worker" arrow>
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: worker.status == 0 ? '#008000' : '#F70000'
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteWorker(worker)}
                        >
                          {worker.status == 0 ? (
                            <PersonIcon />
                          ) : (
                            <PersonOffIcon />
                          )}
                        </IconButton>
                      )}
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
          count={filteredWorkers.length}
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

WorkerTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

WorkerTable.defaultProps = {
  cryptoOrders: []
};

export default WorkerTable;
