import { FC, ChangeEvent, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Modal from 'src/components/Modal';
import Label from 'src/components/Label';
import CreateCompanySiteForm from './CreateCompanySiteForm';

interface RecentOrdersTableProps {}

const CompanySiteTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [selectedSite, setSelectedSite] = useState<any>({});
  const [isEditCompanySite, setIsEditCompanySite] = useState<boolean>(false);

  const companySiteList = useSelector(
    ({ companySite }: RootStateOrAny) => companySite.list
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

  const paginatedCompanySites = applyPagination(companySiteList, page, limit);
  const handleModalClose = () => {
    setIsEditCompanySite(false);
  };

  const onSiteEdit = (site) => {
    setSelectedSite(site);
    setIsEditCompanySite(true);
  };

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
            {paginatedCompanySites.map((site: any) => {
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
                      {site?.company_id || '-'}
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
                      {site?.address || '-'}
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
                      LAT: {site?.latitude || '-'}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      LONG: {site?.longitude || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(site.status)}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit company site" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#5569FF'
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => onSiteEdit(site)}
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
      </>
      <Box p={2}>
        <TablePagination
          component="div"
          count={companySiteList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Modal
        isOpen={isEditCompanySite}
        handleClose={handleModalClose}
        content={
          <CreateCompanySiteForm
            onSuccess={handleModalClose}
            companyID={selectedSite?.company_id}
            formData={selectedSite}
          />
        }
        modalHeader={'Create Company Site'}
        modalDescription={
          'Fill the forum and press submit button to create a company site.'
        }
      />
    </Card>
  );
};

export default CompanySiteTable;
