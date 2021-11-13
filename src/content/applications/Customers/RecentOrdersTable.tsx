import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Avatar,
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  Container,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from 'src/components/Label';

import ProfileCover from './ProfileCover';
import EditProfileTab from './EditProfileTab';

interface RecentOrdersTableProps {
  className?: string;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
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

  return (
    <Card>
      <CardHeader
        action={<Box width={150}></Box>}
        title="Customer Registration"
      />

      <Divider />
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover user={user} />
          </Grid>

          <Grid item xs={12} md={12}>
            <EditProfileTab />
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
};

export default RecentOrdersTable;
