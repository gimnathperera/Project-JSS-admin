import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import { createJob } from 'src/store/actions/job.actions';
import { fetchCustomerList } from 'src/store/actions/customer.actions';
import { fetchCompanySiteList } from 'src/store/actions/company-site.actions';
import { fetchJobTypeList } from 'src/store/actions/job-type.actions';

interface CreateJobFormProps {
  onSuccess(): any;
  formData?: any;
}

const CreateJobForm = ({ onSuccess }: CreateJobFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const companyList = useSelector(
    ({ customer }: RootStateOrAny) => customer.list
  );
  const companySiteList = useSelector(
    ({ companySite }: RootStateOrAny) => companySite.list
  );

  const jobTypeList = useSelector(
    ({ jobType }: RootStateOrAny) => jobType.list
  );

  useEffect(() => {
    dispatch(fetchCustomerList());
    dispatch(fetchJobTypeList());
  }, []);

  const initialFormValues = {
    name: '',
    type_id: '',
    company_id: '',
    site_id: '',
    start_date: '',
    end_date: '',
    status: '',
    description:''
  };

  const jobRegisterSchema = Yup.object({
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


  const renderJobTypeList = () =>
    jobTypeList &&
    jobTypeList?.length > 0 &&
    jobTypeList.map((type: any) => {
      return (
        <MenuItem value={type.id} key={type.id}>
          {type.name}
        </MenuItem>
      );
    });


    const fetchJobTypes = () => {
      dispatch(fetchJobTypeList());
    };


  const onSubmitJob = (values: any) => {
    dispatch(createJob(values));
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
          validationSchema={jobRegisterSchema}
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

              {/* <TextField
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
              </TextField> */}

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
                disabled={loading}
              >
                {renderJobTypeList()}
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
                disabled={loading}
              >
                {renderCompanyList()}
              </TextField>

              {values.company_id && (
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
                  disabled={loading}
                >
                  {renderCompanySiteList()}
                </TextField>
              )}

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
                    SUBMIT
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
export default CreateJobForm;
