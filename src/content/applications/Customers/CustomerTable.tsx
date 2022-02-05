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
  Avatar,
  CardHeader,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Label from 'src/components/Label';
import { styled } from '@mui/material/styles';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders?: CryptoOrder[];
  customers?: any[];
}

const LogoImage = styled(Avatar)`
  .css-1pqm26d-MuiAvatar-img {
    object-fit: contain;
  }
`;

interface Filters {
  status?: CryptoOrderStatus;
}

const WorkerTable: FC<RecentOrdersTableProps> = ({ customers }) => {
  const navigate = useNavigate();

  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const selectedBulkActions = selectedCustomers.length > 0;
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

  const applyFilters = (_customers: any, filters: Filters): any => {
    return _customers.filter((customer) => {
      let matches = true;

      if (filters.status && customer.status !== Number(filters.status)) {
        matches = false;
      }

      return matches;
    });
  };

  const applyPagination = (
    _customers: any,
    page: number,
    limit: number
  ): any => {
    return _customers.slice(page * limit, page * limit + limit);
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
    setSelectedCustomers(
      event.target.checked ? customers.map((worker) => worker.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCustomers.includes(cryptoOrderId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedCustomers((prevSelected) =>
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

  const handleFileDownload = (worker: any) => {
    try {
      worker?.legal_doc && window.open(worker?.legal_doc);
    } catch (err) {}
  };

  const filteredCustomers = applyFilters(customers, filters);

  const paginatedCustomers = applyPagination(filteredCustomers, page, limit);

  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;

  const selectedAllCryptoOrders = selectedCustomers.length === customers.length;
  const theme = useTheme();

  const handleDetailedClick = (customerId: string) => {
    navigate(`/app/customer/${customerId}`);
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
          title="Customers"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Customer Details</TableCell>
              <TableCell align="center">Contact Name</TableCell>
              <TableCell align="center">Primary Contact</TableCell>
              <TableCell align="center">Secondary Contact</TableCell>
              <TableCell align="center">Additional Info</TableCell>
              <TableCell align="center">ABN/ACN</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">BR Number</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer: any) => {
              const isWorkerSelected = selectedCustomers.includes(customer?.id);

              return (
                <TableRow hover key={customer?.id} selected={isWorkerSelected}>
                  <TableCell padding="checkbox" align="right">
                    <Checkbox
                      color="primary"
                      checked={isWorkerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, customer?.id)
                      }
                      value={isWorkerSelected}
                    />
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    <LogoImage
                      variant="rounded"
                      alt={'logo'}
                      src={customer?.logo}
                    />
                  </TableCell>

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
                        <Button
                          onClick={() => handleDetailedClick(customer.id)}
                        >
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            align="left"
                          >
                            {customer.name}
                          </Typography>
                        </Button>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          align="left"
                        >
                          {customer.email}
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
                      {customer.contact_name}
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
                      {customer?.primary_contact_number || '-'}
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
                      {customer?.secondary_contact_number || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {customer.additional_info || '-'}
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
                      ABN: {customer.abn_registration_number || '-'}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      ACN: {customer.acn_registration_number || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {customer.address}
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
                      {customer.br_number || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(customer.status)}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Download legal doc" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#308D46'
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleFileDownload(customer)}
                      >
                        <SimCardDownloadIcon />
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
          count={filteredCustomers.length}
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
