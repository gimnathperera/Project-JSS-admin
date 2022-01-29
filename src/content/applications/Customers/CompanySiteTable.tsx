import { FC, ChangeEvent, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useNavigate } from 'react-router-dom';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders?: CryptoOrder[];
  customers?: any[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const CompanySiteTable: FC<RecentOrdersTableProps> = ({ customers }) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
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

  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Company ID</TableCell>
              <TableCell align="center">Company Site Name</TableCell>
              <TableCell align="center">Company Address</TableCell>
              <TableCell align="center">Company Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer: any) => {
              const isWorkerSelected = selectedCustomers.includes(customer.id);

              return (
                <TableRow hover key={customer.id} selected={isWorkerSelected}>
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
      </>
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

CompanySiteTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

CompanySiteTable.defaultProps = {
  cryptoOrders: []
};

export default CompanySiteTable;
