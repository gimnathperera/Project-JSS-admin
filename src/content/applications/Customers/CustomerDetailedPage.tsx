import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Box, Container, CircularProgress } from '@mui/material';

import Footer from 'src/components/Footer';
import CustomerEditTab from './CustomerEditTab';

import { fetchCustomerById } from '../../../store/actions/customer.actions';
import { fetchCompanySiteList } from '../../../store/actions/company-site.actions';

const ManagementUserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const _customer = useSelector(
    ({ customer }: RootStateOrAny) => customer.currentCustomer
  );

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchCustomerById(id));
    dispatch(fetchCompanySiteList(id));
  }, []);

  return (
    <>
      <Helmet>
        <title>Customer Details - Management</title>
      </Helmet>

      <Container sx={{ mt: 3 }} maxWidth="lg">
        {loading ? (
          <Box
            sx={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={64} disableShrink thickness={3} />
          </Box>
        ) : (
          <CustomerEditTab _customer={_customer} />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default ManagementUserProfile;
