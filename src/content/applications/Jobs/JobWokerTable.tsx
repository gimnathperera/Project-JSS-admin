import { FC, ChangeEvent, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Tooltip,
  Typography,
  TablePagination,
  IconButton
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import Modal from 'src/components/Modal';
import Label from 'src/components/Label';

interface RecentOrdersTableProps {}

const JobWokerTable: FC<RecentOrdersTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [selectedSite, setSelectedSite] = useState<any>({});
  const [isEditCompanySite, setIsEditCompanySite] = useState<boolean>(false);

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

  const handleModalClose = () => {
    setIsEditCompanySite(false);
  };

  const onSiteEdit = (site: any) => {
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
              <TableCell align="center">Worker Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Assign Alias</TableCell>
              <TableCell align="center">Certification Exp</TableCell>
              <TableCell align="center">Time Duration</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
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
                    {getStatusLabel(site?.status)}
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
          count={jobWorkerList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* <Modal
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
      /> */}
    </Card>
  );
};

export default JobWokerTable;
