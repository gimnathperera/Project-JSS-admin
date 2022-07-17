import { Card, Box, Typography } from '@mui/material';

import CustomersBackgroundImage from '../../assets/images/customers.svg';
function WatchListColumn1({ count }) {
  return (
    <Card
      sx={{
        backgroundImage: `url(${CustomersBackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        borderRadius: '20px',
        boxShadow: ' 0px 4px 4px #fbcf96',
        backgroundColor: '#feefdc'
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography
              variant="h4"
              noWrap
              color="#f9af50"
              sx={{
                fontSize: '24px',
                letterSpacing: '0.2px',
                fontWeight: '600'
              }}
            >
             Active Customers
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 3
          }}
        >
          <Typography
            variant="h2"
            color="#f9af50"
            sx={{
              fontSize: '35px',
              pr: 1,
              mb: 1,
              letterSpacing: '0.2px',
              fontWeight: '600'
            }}
          >
            {count || '-'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        ></Box>
      </Box>
      <Box height={100} sx={{ ml: -1.5 }}></Box>
    </Card>
  );
}

export default WatchListColumn1;
