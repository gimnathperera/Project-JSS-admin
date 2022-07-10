/* eslint-disable eqeqeq */
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import {
  createCustomer,
  updateCustomer
} from 'src/store/actions/customer.actions';
import { MOBILE_REGEX } from 'src/constants/common-configurations';
interface CreateCustomerFormProps {
  onSuccess(): any;
  formData?: any;
}

const UploadIcon = styled(FileCopyIcon)(({ theme }) => ({
  backgroundColor: '#A2ABBA',
  color: '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: 4,
  fontSize: 36
}));
const ImageIcon = styled(InsertPhotoIcon)(({ theme }) => ({
  backgroundColor: '#A2ABBA',
  color: '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: 4,
  fontSize: 36
}));

const CreateCustomerForm = ({
  onSuccess,
  formData
}: CreateCustomerFormProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    name: formData?.name || '',
    email: formData?.email || '',
    address: formData?.address || '',
    br_number: formData?.br_number || '',
    abn_registration_number: formData?.abn_registration_number || '',
    acn_registration_number: formData?.acn_registration_number || '',
    logo: formData?.logo || '',
    legal_doc: formData?.legal_doc || '',
    contact_name: formData?.contact_name || '',
    primary_contact_number: formData?.primary_contact_number || '',
    secondary_contact_number: formData?.secondary_contact_number || '',
    status: formData?.status == 1 ? '1' : formData?.status == 0 ? '0' : '',
    additional_info: formData?.additional_info || ''
  };

  const customererRegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    abn_registration_number: Yup.string()
      .required('ABN number is required')
      .matches(/^[0-9]{11}$/, 'Must be exactly 11 digits'),
    acn_registration_number: Yup.string()
      .required('ACN number is required')
      .matches(/^[0-9]{9}$/, 'Must be exactly 9 digits'),
    status: Yup.string().required('Status is required'),
    contact_name: Yup.string().required('Contact name is required'),
    primary_contact_number: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Primary contact number required'),
    secondary_contact_number: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Secondary contact number required'),

    additional_info: Yup.string().required('Additional info is required')
  });

  const customerUpdateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    abn_registration_number: Yup.string()
      .required('ABN number is required')
      .matches(/^[0-9]{11}$/, 'Must be exactly 11 digits'),
    acn_registration_number: Yup.string()
      .required('ACN number is required')
      .matches(/^[0-9]{9}$/, 'Must be exactly 9 digits'),
    status: Yup.string().required('Status is required'),
    contact_name: Yup.string().required('Contact name is required'),
    primary_contact_number: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Primary contact number required'),
    additional_info: Yup.string().required('Additional info is required')
  });

  const onSubmitCustomer = (values: any) => {
    if (formData) {
      const data = assignUpdateFormValues(values);
      const payload = {
        id: formData.id,
        data
      };
      dispatch(updateCustomer(payload));
    } else {
      const data = assignCreateFormValues(values);
      dispatch(createCustomer(data));
    }
    onSuccess();
  };

  const assignCreateFormValues = (values) => {
    const _formData = new FormData();
    _formData.append('name', values?.name);
    _formData.append('email', values?.email);
    _formData.append('address', values?.address);
    _formData.append(
      'abn_registration_number',
      values?.abn_registration_number
    );
    _formData.append(
      'acn_registration_number',
      values?.acn_registration_number
    );
    _formData.append('status', values?.status);
    _formData.append('contact_name', values?.contact_name);
    _formData.append('primary_contact_number', values?.primary_contact_number);
    _formData.append(
      'secondary_contact_number',
      values?.secondary_contact_number
    );
    _formData.append('additional_info', values?.additional_info);

    _formData.append('logo', values?.logo);
    _formData.append('legal_doc', values?.legal_doc);

    return _formData;
  };

  const assignUpdateFormValues = (values) => {
    const _formData = new FormData();
    _formData.append('_method', 'PUT');
    _formData.append('name', values?.name);
    _formData.append('email', values?.email);
    _formData.append('address', values?.address);
    _formData.append(
      'abn_registration_number',
      values?.abn_registration_number
    );
    _formData.append(
      'acn_registration_number',
      values?.acn_registration_number
    );
    _formData.append('status', values?.status);
    _formData.append('contact_name', values?.contact_name);
    _formData.append('primary_contact_number', values?.primary_contact_number);
    _formData.append('additional_info', values?.additional_info);
    values?.secondary_contact_number &&
      _formData.append(
        'secondary_contact_number',
        values?.secondary_contact_number
      );
    values?.logo?.name && _formData.append('logo', values?.logo);
    values?.legal_doc?.name && _formData.append('legal_doc', values?.legal_doc);

    return _formData;
  };

  return (
    <Box
      sx={{
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
            formData ? customerUpdateSchema : customererRegisterSchema
          }
          onSubmit={(values) => {
            onSubmitCustomer(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            touched,
            values,
            setFieldValue
          }) => (
            <Form>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Customer Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Customer Email"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Customer Address"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.abn_registration_number &&
                    errors.abn_registration_number
                )}
                fullWidth
                helperText={
                  touched.abn_registration_number &&
                  errors.abn_registration_number
                }
                label="ABN Number"
                margin="normal"
                name="abn_registration_number"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.abn_registration_number}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.acn_registration_number &&
                    errors.acn_registration_number
                )}
                fullWidth
                helperText={
                  touched.acn_registration_number &&
                  errors.acn_registration_number
                }
                label="ACN Number"
                margin="normal"
                name="acn_registration_number"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.acn_registration_number}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.status && errors.status)}
                fullWidth
                helperText={touched.status && errors.status}
                select
                label="Customer Status"
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

              <TextField
                error={Boolean(touched.contact_name && errors.contact_name)}
                fullWidth
                helperText={touched.contact_name && errors.contact_name}
                label="Contact Name"
                margin="normal"
                name="contact_name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.contact_name}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.primary_contact_number &&
                    errors.primary_contact_number
                )}
                fullWidth
                helperText={
                  touched.primary_contact_number &&
                  errors.primary_contact_number
                }
                label="Primary Contact Number"
                margin="normal"
                name="primary_contact_number"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.primary_contact_number}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.secondary_contact_number &&
                    errors.secondary_contact_number
                )}
                fullWidth
                helperText={
                  touched.secondary_contact_number &&
                  errors.secondary_contact_number
                }
                label="Secondary Contact Number"
                margin="normal"
                name="secondary_contact_number"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.secondary_contact_number}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.additional_info && errors.additional_info
                )}
                fullWidth
                helperText={touched.additional_info && errors.additional_info}
                label="Additional Info"
                margin="normal"
                name="additional_info"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.additional_info}
                variant="outlined"
              />

              <Box
                display="flex"
                flexDirection="row"
                sx={{ padding: '15px 0px' }}
              >
                <ImageIcon />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    marginLeft: '15px',
                    borderColor: '#BABCBF',
                    color: '#A2ABBA'
                  }}
                >
                  {values.logo.name || 'Upload Logo'}
                  <input
                    name="logo"
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    hidden
                    onChange={(event) => {
                      setFieldValue('logo', event.target.files[0]);
                    }}
                  />
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                sx={{ padding: '15px 0px' }}
              >
                <UploadIcon />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    marginLeft: '15px',
                    borderColor: '#BABCBF',
                    color: '#A2ABBA'
                  }}
                >
                  {values.legal_doc.name || 'Upload Legal Doc'}
                  <input
                    name="legal_doc"
                    id="contained-button-file"
                    type="file"
                    hidden
                    onChange={(event) => {
                      setFieldValue('legal_doc', event.target.files[0]);
                    }}
                  />
                </Button>
              </Box>

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
export default CreateCustomerForm;
