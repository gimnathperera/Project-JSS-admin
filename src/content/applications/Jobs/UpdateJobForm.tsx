/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import { updateJob } from 'src/store/actions/job.actions';
import { fetchCustomerList } from 'src/store/actions/customer.actions';
import { fetchCompanySiteList } from 'src/store/actions/company-site.actions';

interface UpdateJobFormProps {
  onSuccess(): any;
  formData?: any;
}

const UpdateJobForm = ({ onSuccess, formData }: UpdateJobFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const companyList = useSelector(
    ({ customer }: RootStateOrAny) => customer.list
  );
  const companySiteList = useSelector(
    ({ companySite }: RootStateOrAny) => companySite.list
  );

  useEffect(() => {
    dispatch(fetchCustomerList());
    dispatch(fetchCompanySiteList(formData.company_id));
  }, []);

  const initialFormValues = {
    name: formData?.name || '',
    type_id: formData?.type_id || '',
    company_id: formData?.company_id || '',
    site_id: formData?.site_id || '',
    start_date: formData ? formData?.start_date : '',
    end_date: formData ? formData?.end_date : '',
    status: formData?.status == 1 ? '1' : formData?.status == 0 ? '0' : '',
    description: formData?.description || '',
  };

  const jobUpdateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    type_id: Yup.string().required('Job type is required'),
    company_id: Yup.string().required('Company is required'),
    site_id: Yup.string().required('Company site is required'),
    start_date: Yup.string().required('Start date site is required'),
    end_date: Yup.string().required('End date site is required'),
    status: Yup.string().required('Status site is required')
  });

  const renderCompanyList = () =>
    companyList &&
    companyList?.length > 0 &&
    companyList.map((company: any) => {
      return (
        <MenuItem value={company.id} key={company.id}>
          {company.name}
        </MenuItem>
      );
    });

  const renderCompanySiteList = () =>
    companySiteList &&
    companySiteList?.length > 0 &&
    companySiteList.map((site: any) => {
      return (
        <MenuItem value={site.id} key={site.id}>
          {site.name}
        </MenuItem>
      );
    });

  const fetchCompanySites = (companyId: string | number) => {
    dispatch(fetchCompanySiteList(companyId));
  };

  const onSubmitJob = (values: any) => {
    const payload = {
      id: formData?.id,
      data: values
    };
    dispatch(updateJob(payload));
    onSuccess();
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
          validationSchema={jobUpdateSchema}
          onSubmit={(values) => {
            onSubmitJob(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Job Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.type_id && errors.type_id)}
                fullWidth
                helperText={touched.type_id && errors.type_id}
                select
                label="Job Type"
                margin="normal"
                name="type_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type_id}
                variant="outlined"
              >
                <MenuItem value={'1'}>Once off</MenuItem>
                <MenuItem value={'2'}>Ongoing</MenuItem>
              </TextField>
              <TextField
                error={Boolean(touched.status && errors.status)}
                fullWidth
                helperText={touched.status && errors.status}
                select
                label="Job Status"
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
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Job Description"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.description}
                  variant="outlined"
              />

              <TextField
                error={Boolean(touched.company_id && errors.company_id)}
                fullWidth
                helperText={touched.company_id && errors.company_id}
                select
                label="Company"
                margin="normal"
                name="company_id"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange('company_id')(e);
                  fetchCompanySites(e.target.value);
                }}
                value={values.company_id}
                variant="outlined"
              >
                {renderCompanyList()}
              </TextField>

              <TextField
                error={Boolean(touched.site_id && errors.site_id)}
                fullWidth
                helperText={touched.site_id && errors.site_id}
                select
                label="Company Site"
                margin="normal"
                name="site_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.site_id}
                variant="outlined"
              >
                {renderCompanySiteList()}
              </TextField>

              <TextField
                error={Boolean(touched.start_date && errors.start_date)}
                fullWidth
                helperText={touched.start_date && errors.start_date}
                type="date"
                label="Start Date"
                margin="normal"
                name="start_date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.start_date}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                error={Boolean(touched.end_date && errors.end_date)}
                fullWidth
                helperText={touched.end_date && errors.end_date}
                type="date"
                label="End Date"
                margin="normal"
                name="end_date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.end_date}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
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
                    UPDATE
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
export default UpdateJobForm;
