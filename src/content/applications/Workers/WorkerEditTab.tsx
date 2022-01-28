import { useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  CardContent,
  Grid,
  Container,
  CircularProgress,
  Divider
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import Modal from 'src/components/Modal';
import { getValidDate } from 'src/common/functions';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import CreateWorkerForm from './CreateWorkerForm';

type Props = {};

const Input = styled('input')({
  display: 'none'
});
const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    
        position: relative;
        overflow: visible;
        display: inline-block;
        margin-top: -${theme.spacing(9)};
        margin-left: ${theme.spacing(2)};
    
        .MuiAvatar-root {
          width: ${theme.spacing(16)};
          height: ${theme.spacing(16)};
        }
    `
);
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
        position: absolute;
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        bottom: -${theme.spacing(1)};
        right: -${theme.spacing(1)};
    
        .MuiIconButton-root {
          border-radius: 100%;
          background: ${theme.colors.primary.main};
          color: ${theme.palette.primary.contrastText};
          box-shadow: ${theme.colors.shadows.primary};
          width: ${theme.spacing(4)};
          height: ${theme.spacing(4)};
          padding: 0;
      
          &:hover {
            background: ${theme.colors.primary.dark};
          }
        }
    `
);
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

const user = {
  savedCards: 7,
  name: 'Catherine Pike',
  coverImg: '/static/images/placeholders/covers/5.jpg',
  avatar: '/static/images/avatars/4.jpg',
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
  jobtitle: 'Web Developer',
  location: 'Barcelona, Spain',
  followers: '465'
};

const WorkerEditTab = ({ _worker }: any) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const handleModalClose = () => {
    setIsEdit(false);
  };

  const handleBackClick = () => {
    navigate('/app/worker');
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
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                {_worker.name || <Skeleton variant="text" width={210} />}
              </Typography>

              <Typography variant="subtitle2">
                {_worker.additional_info || (
                  <Skeleton variant="text" width={210} />
                )}
              </Typography>
            </Box>
          </Box>
          <CardCover>
            <CardMedia image={user.coverImg} />
            <CardCoverAction>
              <Input accept="image/*" id="change-cover" multiple type="file" />
            </CardCoverAction>
          </CardCover>
          <AvatarWrapper>
            <Avatar variant="rounded" alt={user.name} src={user.avatar} />
            <ButtonUploadWrapper>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
              />
            </ButtonUploadWrapper>
          </AvatarWrapper>
          <Box py={2} pl={2} mb={3}>
            <Typography gutterBottom variant="h4">
              {_worker.email || <Skeleton variant="text" width={210} />}
            </Typography>
            <Typography variant="subtitle2">
              {_worker.employee_number || (
                <Skeleton variant="text" width={100} />
              )}
            </Typography>
            <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
              {_worker?.status ? (
                <Label color="success">Active</Label>
              ) : (
                <Label color="warning">Inactive</Label> || (
                  <Skeleton variant="text" width={60} />
                )
              )}
            </Typography>
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
                    Personal Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to personal details
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
                        Name:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.name || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
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
                        Date of birth:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.dob || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
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
                        Contact Number:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.contact_number || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
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
                        Email address:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.email || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
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
                        Address:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                        <Text color="black">
                          {' '}
                          {_worker.address || (
                            <Skeleton variant="text" width={210} />
                          )}
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
                        Additional Info:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                        <Text color="black">
                          {' '}
                          {_worker.additional_info || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </Text>
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
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
                    Account Settings
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage details related to account
                  </Typography>
                </Box>
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
                        Employee Number:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.employee_number || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
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
                        Assign Alias:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                        <Text color="black">
                          {' '}
                          {_worker.assign_alias || (
                            <Skeleton variant="text" width={210} />
                          )}
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
                        Certification:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                        <Text color="black">
                          {' '}
                          {_worker.certificate || (
                            <Skeleton variant="text" width={210} />
                          )}
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
                        Certification EXP:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                        <Text color="black">
                          {' '}
                          {_worker.certificate_expire_date || (
                            <Skeleton variant="text" width={210} />
                          )}
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
                        Language:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>English (US)</b>
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
                        Account status:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Label color="success">
                        <DoneTwoToneIcon fontSize="small" />
                        <b>Active</b>
                      </Label>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        isOpen={isEdit}
        handleClose={handleModalClose}
        content={
          <CreateWorkerForm onSuccess={handleModalClose} formData={_worker} />
        }
        modalHeader={'Update worker'}
        modalDescription={
          'Fill the forum and press update button to update the selected worker.'
        }
      />
    </Grid>
  );
};

export default WorkerEditTab;
