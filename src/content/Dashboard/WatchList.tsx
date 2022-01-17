import { MouseEvent, useState } from 'react';
import {
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import WatchListColumn1 from './WatchListColumn1';
import WatchListColumn2 from './WatchListColumn2';
import WatchListColumn3 from './WatchListColumn3';
import WatchListColumn1Chart from './WatchListColumn1Chart';
import RecentActivity from '../applications/Users/profile/RecentActivity';

const WatchListColumn1ChartWrapper = styled(WatchListColumn1Chart)(
  ({ theme }) => `
        height: 130px;
`
);

function WatchList() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');
  const price = {
    week: {
      labels: [
        'Monday',
        'Tueday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16]
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Overview</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <>
          <Grid item lg={4} xs={12}>
            <WatchListColumn1 />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn2 />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn3 />
          </Grid>
        </>

        <Grid item xs={12}>
          <Card
            sx={{
              textAlign: 'center',
              p: 3,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Grid
              xs={9}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Today’s Summary
                </Typography>
                <Typography variant="subtitle2">
                  as of 25 Aug 2021, 09:41 PM
                </Typography>
              </Box>
              <WatchListColumn1ChartWrapper
                data={price.week.data}
                labels={price.week.labels}
              />
            </Grid>
            <Grid xs={3}>
              <RecentActivity />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default WatchList;
