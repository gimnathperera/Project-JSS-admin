import { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { createJobWorkers } from 'src/store/actions/job.actions';
import { fetchWorkerList } from 'src/store/actions/worker.actions';

interface AddWorkerToJobFormProps {
  onSuccess(): any;
  jobID: string;
}

const AddWorkerToJobForm = ({ onSuccess, jobID }: AddWorkerToJobFormProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const [workerCount, setWorkerCount] = useState<number>(1);

  const workerList = useSelector(({ worker }: RootStateOrAny) => worker.list);

  useEffect(() => {
    dispatch(fetchWorkerList());
  }, []);

  const initialFormValues = {
    job_workers: [
      {
        worker_id: '',
        start_time: '',
        end_time: ''
      }
    ]
  };

  const assignWorkerSchema = Yup.object({
    job_workers: Yup.array().of(
      Yup.object().shape({
        worker_id: Yup.string().required('Worker required'),
        start_time: Yup.string().required('Start time required'),
        end_time: Yup.string().required('End time required')
      })
    )
  });

  const onSubmitWorker = ({ job_workers }: any) => {
    const payLoad = {
      job_id: jobID,
      job_workers
    };
    dispatch(createJobWorkers(payLoad));
    onSuccess();
  };

  const increaseWorkerCount = () => {
    setWorkerCount((count) => count + 1);
  };

  const removeWorker = () => {
    if (workerCount == 1) return;
    setWorkerCount((count) => count - 1);
  };

  const renderWorkerList = () => {
    return (
      workerList &&
      workerList?.map((worker) => (
        <MenuItem value={worker.id}>{worker?.name}</MenuItem>
      ))
    );
  };

  const renderMoreWorker = (
    errors: any,
    handleBlur: any,
    handleChange: any,
    touched: any,
    values: any
  ): JSX.Element => (
    <FieldArray
      name="job_workers"
      render={(helpers) => (
        <>
          {Array.from({ length: workerCount }, (item, index) => (
            <Card key={index} sx={{ margin: '15px 0px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h4"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Worker #{index + 1}
                  </Typography>
                  <IconButton onClick={removeWorker} size="small">
                    ❌
                  </IconButton>
                </Box>

                <TextField
                  error={Boolean(
                    touched?.job_workers &&
                      touched?.job_workers[index]?.worker_id &&
                      errors?.job_workers &&
                      errors?.job_workers[index]?.worker_id
                  )}
                  fullWidth
                  helperText={
                    touched?.job_workers &&
                    touched?.job_workers[index]?.worker_id &&
                    errors?.job_workers &&
                    errors?.job_workers[index]?.worker_id
                  }
                  select
                  label="Worker"
                  margin="normal"
                  name={`job_workers.${index}.worker_id`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                >
                  {renderWorkerList()}
                </TextField>

                <Box
                  display="flex"
                  sx={{ justifyContent: 'space-between', paddingTop: '10px' }}
                >
                  <TextField
                    error={Boolean(
                      touched?.job_workers?.[index]?.start_time &&
                        errors?.job_workers?.[index]?.start_time
                    )}
                    helperText={
                      touched?.job_workers?.[index]?.start_time &&
                      errors?.job_workers?.[index]?.start_time
                    }
                    label="Start Time"
                    type="time"
                    defaultValue="00:00"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    sx={{ width: '45%' }}
                    name={`job_workers.${index}.start_time`}
                  />
                  <TextField
                    error={Boolean(
                      touched?.job_workers?.[index]?.end_time &&
                        errors?.job_workers?.[index]?.end_time
                    )}
                    helperText={
                      touched?.job_workers?.[index]?.end_time &&
                      errors?.job_workers?.[index]?.end_time
                    }
                    label="End Time"
                    type="time"
                    defaultValue="00:00"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    sx={{ width: '45%' }}
                    name={`job_workers.${index}.end_time`}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={increaseWorkerCount}
            color="primary"
            variant="outlined"
          >
            Add more
          </Button>
        </>
      )}
    />
  );

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
          validationSchema={assignWorkerSchema}
          onSubmit={(values) => {
            onSubmitWorker(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                {renderMoreWorker(
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values
                )}

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
                      {'ADD WORKER'}
                    </Button>
                  )}
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Box>
  );
};
export default AddWorkerToJobForm;