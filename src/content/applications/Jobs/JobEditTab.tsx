import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Button,
  IconButton,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Modal from 'src/components/Modal';

import UpdateJobForm from './UpdateJobForm';
import AddWorkerToJobForm from './AddWorkerToJobForm';
import JobWokerTable from './JobWokerTable';
import WorkerPlanTable from './workerPlanTable';

type Props = {};

const Input = styled('input')({
  display: 'none'
});
const CardCover = styled(Card)(
  ({ theme }) => `
        position: relative;
    
        .MuiCardMedia-root {
          height: ${theme.spacing(26)};
        }
    `
);
const CardCoverAction = styled(Box)(
  ({ theme }) => `
        position: absolute;
        right: ${theme.spacing(2)};
        bottom: ${theme.spacing(2)};
    `
);
const HeaderContaienr = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});
const CoverPhoto = styled(CardMedia)`
  background-size: contain;
`;

const coverImg = '/static/images/placeholders/covers/banner.svg';

const JobEditTab = ({ _job }: any) => {
  const navigate = useNavigate();
  const myRef = useRef(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddWorker, setIsAddWorker] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate('/app/job');
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const handleModalClose = () => {
    setIsEdit(false);
    setIsAddWorker(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} md={12}>
        <>
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                color="primary"
                sx={{ p: 2, mr: 2 }}
                onClick={handleBackClick}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <HeaderContaienr>
              <Typography variant="h3" component="h3" gutterBottom>
                {_job?.name || <Skeleton variant="text" width={210} />}
              </Typography>
            </HeaderContaienr>
          </Box>
          <CardCover>
            <CoverPhoto image={coverImg} />
            <CardCoverAction>
              <Input accept="image/*" id="change-cover" multiple type="file" />
            </CardCoverAction>
          </CardCover>

          <Box py={2} pl={2} mb={3}>
            <Typography gutterBottom variant="h4">
              {_job?.name || <Skeleton variant="text" width={210} />}
            </Typography>

            <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
              {_job?.status == 1 ? (
                <Label color="success">Active</Label>
              ) : _job?.status == 0 ? (
                <Label color="warning">Inactive</Label>
              ) : (
                <Skeleton variant="text" width={60} />
              )}
            </Typography>

            <Box
              display={{ xs: 'block', md: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setIsAddWorker(true)}
                >
                  Assign Worker
                </Button>
                <Button
                  size="small"
                  sx={{ mx: 1 }}
                  variant="outlined"
                  onClick={executeScroll}
                >
                  View Job Wokers
                </Button>
                <IconButton color="primary" sx={{ p: 0.5 }}>
                  <MoreHorizTwoToneIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Job Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to job and workers
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  startIcon={<EditTwoToneIcon />}
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Job Name:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b> {_job?.name || '-'}</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Job Type:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b> {_job?.job_type || '-'}</b>
                      </Text>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Company Name:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b> {_job?.company || '-'}</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Company Site:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b> {_job?.site || '-'}</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Start Date:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b> {_job?.start_date || '-'}</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        End Date:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                        <Text color="black">
                          {' '}
                          <b> {_job?.end_date || '-'}</b>
                        </Text>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Job Status:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                        {_job?.status ? (
                          <Label color="success">Active</Label>
                        ) : (
                          <Label color="warning">Inactive</Label> || (
                            <Skeleton variant="text" width={60} />
                          )
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} ref={myRef}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Job workers
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage workers related to job
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent>
                <JobWokerTable />
              </CardContent>
            </Card>
          </Grid>
          {_job.job_type === 'Ongoing' ? (
          <Grid item xs={12} ref={myRef}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Work Plan
                  </Typography>
                  <Typography variant="subtitle2">
                    Job work plan for users
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent>
               <WorkerPlanTable />
              </CardContent>
            </Card>
          </Grid>
              ) : ""}

        </Grid>
      </Grid>
      <Modal
        isOpen={isEdit}
        handleClose={handleModalClose}
        content={<UpdateJobForm onSuccess={handleModalClose} formData={_job} />}
        modalHeader={'Update Job'}
        modalDescription={
          'Fill the forum and press update button to update the selected job.'
        }
      />
      <Modal
        isOpen={isAddWorker}
        handleClose={handleModalClose}
        content={
          <AddWorkerToJobForm
            onSuccess={handleModalClose}
            jobID={_job?.id}
            startDate={_job?.start_date}
            endDate={_job?.end_date}
          />
        }
        modalHeader={'Assign Workers'}
        modalDescription={
          'Fill the forum and press update button to update the selected job.'
        }
      />
    </Grid>
  );
};

export default JobEditTab;
