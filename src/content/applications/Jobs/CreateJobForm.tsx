import { ReactElement } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Container,
  Button
} from '@mui/material';
import Text from 'src/components/Text';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
interface Props {}

const CreateJobForm = ({}: Props): ReactElement => {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

  return (
    // <Card>
      <Container  maxWidth="lg">
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
                    Create a new job
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    startIcon={<NotificationsActiveTwoToneIcon />}
                    color="error"
                  >
                    Notify and Save
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<SaveTwoToneIcon />}
                    color="warning"
                  >
                    Save as Draft
                  </Button>
                  <Button variant="text" startIcon={<EditTwoToneIcon />}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0} direction="row">
                    <Grid item xs={3} sm={4} md={3}>
                      <Box pb={2}>Job Type:</Box>
                    </Grid>
                    <Grid item xs={9} sm={8} md={9}>
                      <Text color="black">
                        <b>Craig Donin</b>
                      </Text>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <Box pb={2}>Customer Name:</Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '10px'
                        }}
                      >
                        <Text color="black">
                          <b>Nexus Maxim</b>
                        </Text>
                      </Box>
                    </Grid>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Site Address -{' '}
                              <span
                                style={{
                                  fontWeight: 'bold',
                                  color: '#623354'
                                }}
                              >
                                9499 Peninsula Ave. Dothan, AL 36301
                              </span>
                            </TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center">Shift 1</TableCell>
                            <TableCell align="center">Shift 2</TableCell>
                            <TableCell align="center">Shift 3 </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0
                                }
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">2021-05-02</TableCell>
                              <TableCell align="center">2021-05-02</TableCell>
                              <TableCell align="center">
                                <Checkbox />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ pb: 3, paddingTop: '2rem' }}></Box>
          </Grid>
        </Grid>
      </Container>
    // </Card>
  );
};
export default CreateJobForm;
