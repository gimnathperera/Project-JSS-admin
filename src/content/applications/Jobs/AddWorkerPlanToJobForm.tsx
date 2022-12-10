import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
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
import _ from 'lodash';

import {createWorkerPlan} from 'src/store/actions/job.actions';
import { fetchWorkerPlanList } from 'src/store/actions/job.actions';
import { fetchAvailableWorkerList } from 'src/store/actions/worker.actions';

interface AddWorkerPlanToJobFormProps {
  onSuccess(): any;
  jobID: string;
}


const AddWorkerPlanToJobForm = ({
  onSuccess,
  jobID
}: AddWorkerPlanToJobFormProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const workerPlan = useSelector(
    ({ workerPlan }: RootStateOrAny) => workerPlan.list
  );
    const workerList = useSelector(
        ({ jobWorker }: RootStateOrAny) => jobWorker.availableList
    );

    useEffect(() => {
        dispatch(fetchWorkerPlanList(jobID));
        dispatch(fetchAvailableWorkerList({jobId : jobID,plan: true }));
    }, []);

  const initialFormValues = {
    worker_plans:
        workerPlan?.length > 0
        ? workerPlan
        : [
            {
              worker_id: '',
              start_time: '',
              end_time: '',
              day_of_week: ''
            }
          ]
  };

  const daysOfWeek = [
      {
          'id' : 7,
          'name' : 'Sunday'
      },
      {
          'id' : 1,
          'name' : 'Monday'
      },
      {
          'id' : 2,
          'name' : 'Tuesday'
      },
      {
          'id' : 3,
          'name' : 'Wednesday'
      },
      {
          'id' : 4,
          'name' : 'Thursday'
      },
      {
          'id' : 5,
          'name' : 'Friday'
      },
      {
          'id' : 6,
          'name' : 'Saturday'
      }
  ];

  const assignWorkerSchema = Yup.object({
      worker_plans: Yup.array().of(
      Yup.object().shape({
        worker_id: Yup.string().required('Worker required'),
        start_time: Yup.string().required('Start time required'),
        end_time: Yup.string().required('End time required'),
        day_of_week: Yup.string().required('Day of week required')
      })
    )
  });

  const onSubmitWorker = ({ worker_plans }: any) => {
    const payLoad = {
        jobId: jobID,
        days : worker_plans
    };

    dispatch(createWorkerPlan(payLoad));
    onSuccess();
  };

  const renderWorkerList = () => {
    return (
      workerList &&
      workerList?.map((worker) => (
        <MenuItem value={worker.id} key={worker.id}>
          {worker?.name}
        </MenuItem>
      ))
    );
  };

  const renderDaysOfWeekList =  () => {
       return (daysOfWeek.map((day)=>(
           <MenuItem value={day.id} key={day.id}>
               {day.name}
           </MenuItem>
       )));
  };

  const renderMoreWorkerPlan = (
    errors: any,
    handleBlur: any,
    handleChange: any,
    touched: any,
    values: any
  ): JSX.Element => {
    return (
      <FieldArray
        name="worker_plans"
        render={(helpers) => (
          <>
            {Array.from(
              { length: values.worker_plans.length },
              (item, index) => (
                <>
                  <Card key={index} sx={{ margin: '15px 0px' }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          Worker Plan#{index + 1}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            values.worker_plans.length > 1 &&
                              helpers.remove(index);
                          }}
                          size="small"
                        >
                          ❌
                        </IconButton>
                      </Box>

                      <TextField
                        error={Boolean(
                          touched?.worker_plans &&
                            touched?.worker_plans[index]?.worker_id &&
                            errors?.worker_plans &&
                            errors?.worker_plans[index]?.worker_id
                        )}
                        fullWidth
                        helperText={
                          touched?.worker_plans &&
                          touched?.worker_plans[index]?.worker_id &&
                          errors?.worker_plans &&
                          errors?.worker_plans[index]?.worker_id
                        }
                        select
                        label="Worker"
                        margin="normal"
                        name={`worker_plans.${index}.worker_id`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        variant="outlined"
                        value={values?.worker_plans[index]?.worker_id}
                      >
                        {renderWorkerList()}
                      </TextField>

                      <Box
                        display="flex"
                        sx={{
                          justifyContent: 'space-between',
                          paddingTop: '10px',
                          columnGap: '10px'
                        }}
                      >
                        <TextField
                          error={Boolean(
                            touched?.worker_plans?.[index]?.day_of_week &&
                              errors?.worker_plans?.[index]?.day_of_week
                          )}
                          fullWidth
                          helperText={
                            touched?.worker_plans?.[index]?.day_of_week &&
                            errors?.worker_plans?.[index]?.day_of_week
                          }
                          select
                          label="Day of week"
                          name={`worker_plans.${index}.day_of_week`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          variant="outlined"
                          value={values?.worker_plans[index]?.day_of_week}
                        > {renderDaysOfWeekList()}
                        </TextField>


                      </Box>
                      <Box
                        display="flex"
                        sx={{
                          justifyContent: 'space-between',
                          paddingTop: '20px',
                          columnGap: '10px'
                        }}
                      >
                          <TextField
                              error={Boolean(
                                  touched?.worker_plans?.[index]?.start_time &&
                                  errors?.worker_plans?.[index]?.start_time
                              )}
                              helperText={
                                  touched?.worker_plans?.[index]?.start_time &&
                                  errors?.worker_plans?.[index]?.start_time
                              }
                              label="Start Time"
                              type="time"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputLabelProps={{
                                  shrink: true
                              }}
                              sx={{ width: '50%' }}
                              name={`worker_plans.${index}.start_time`}
                              value={values?.worker_plans[index]?.start_time}
                          />
                        <TextField
                          error={Boolean(
                            touched?.worker_plans?.[index]?.end_time &&
                              errors?.worker_plans?.[index]?.end_time
                          )}
                          helperText={
                            touched?.worker_plans?.[index]?.end_time &&
                            errors?.worker_plans?.[index]?.end_time
                          }
                          label="End Time"
                          type="time"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          sx={{ width: '50%' }}
                          name={`worker_plans.${index}.end_time`}
                          value={values?.worker_plans[index]?.end_time}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  <Box display="flex">
                    <Button
                      onClick={() =>
                        helpers.insert(index,  {
                            worker_id: '',
                            start_time: '',
                            end_time: '',
                            day_of_week: ''
                        })
                      }
                      color="primary"
                      variant="outlined"
                    >
                      Add more
                    </Button>
                  </Box>
                </>
              )
            )}
          </>
        )}
      />
    );
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
          validationSchema={assignWorkerSchema}
          onSubmit={(values) => {
            onSubmitWorker(values);
          }}
          enableReinitialize
        >
          {
              ({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                {renderMoreWorkerPlan(
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
                      {'ADD WORKER PLAN'}
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
export default AddWorkerPlanToJobForm;
