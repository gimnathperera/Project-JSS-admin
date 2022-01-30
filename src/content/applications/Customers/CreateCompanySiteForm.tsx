import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import {
  createCompanySite,
  updateCompanySite
} from 'src/store/actions/company-site.actions';

interface CreateCompanySiteFormProps {
  onSuccess(): any;
  formData?: any;
  companyID: string;
}

const CreateCompanySiteForm = ({
  onSuccess,
  formData,
  companyID
}: CreateCompanySiteFormProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    name: formData?.name || '',
    address: formData?.address || '',
    latitude: formData?.latitude || '',
    longitude: formData?.longitude || '',
    status: formData?.status == 1 ? '1' : formData?.status == 0 ? '0' : ''
  };

  const companySiteRegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    latitude: Yup.string()
      .required('Latitude is required')
      .matches(
        /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
        'Invalid latitude'
      ),
    longitude: Yup.string()
      .required('Longitude is required')
      .matches(
        /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
        'Invalid latitude'
      ),
    status: Yup.string().required('Status is required')
  });

  const companySiteUpdateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    latitude: Yup.string()
      .required('Latitude is required')
      .matches(
        /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
        'Invalid latitude'
      ),
    longitude: Yup.string()
      .required('Longitude is required')
      .matches(
        /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
        'Invalid latitude'
      ),
    status: Yup.string().required('Status is required')
  });

  const onSubmitCustomer = (values: any) => {
    if (formData) {
      const payLoad = {
        id: formData.id,
        data: Object.assign(values, {
          company_id: companyID
        })
      };
      dispatch(updateCompanySite(payLoad));
    } else {
      dispatch(
        createCompanySite(
          Object.assign(values, {
            company_id: companyID
          })
        )
      );
    }
    onSuccess();
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialFormValues}
          validationSchema={
            formData ? companySiteUpdateSchema : companySiteRegisterSchema
          }
          onSubmit={(values) => {
            onSubmitCustomer(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Company site name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Company site address"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.latitude && errors.latitude)}
                fullWidth
                helperText={touched.latitude && errors.latitude}
                label="Latitude"
                margin="normal"
                name="latitude"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.latitude}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.longitude && errors.longitude)}
                fullWidth
                helperText={touched.longitude && errors.longitude}
                label="Longitude"
                margin="normal"
                name="longitude"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.longitude}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.status && errors.status)}
                fullWidth
                helperText={touched.status && errors.status}
                select
                label="Company site status"
                margin="normal"
                name="status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                variant="outlined"
              >
                <MenuItem value={'1'}>Active</MenuItem>
                <MenuItem value={'0'}>Inactive</MenuItem>
              </TextField>

              <Box sx={{ py: 2 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {formData ? 'UPDATE' : 'SUBMIT'}
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default CreateCompanySiteForm;
