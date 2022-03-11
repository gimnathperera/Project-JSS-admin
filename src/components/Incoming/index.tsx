import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { fetchWorkerMessages } from 'src/store/actions/msg.action';

interface JobScheduleProps {
  workerId: string | number;
}
const style: any = {
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    minWidth: '300px',
    maxWidth: '400px',
    textAlign: 'justify',
    flexDirection: 'column',
    margin: 2,
    '@media (max-width: 1440px)': {
      minWidth: '100px'
    }
  },
  spinnerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 1.5
  },
  btnContainer: { m: 1, position: 'relative', width: '100%' },
  textArea: {
    width: '100%'
  },
  buttonSpinner: {
    color: 'green[500]',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px'
  },
  jobTxt: {
    fontWeight: 'bold',
    maxWidth: '400px'
  },
  bubble: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Incoming = ({ workerId }: JobScheduleProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const msgs = useSelector(({ msg }: RootStateOrAny) => msg.list);

  useEffect(() => {
    dispatch(fetchWorkerMessages({ workerId }));
  }, []);

  return (
    <>
      {loading ? (
        <Paper sx={style.jobCard}>
          <Box sx={style.spinnerContainer}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <>
          {msgs.length > 0 ? (
            <>
              {msgs.map((msg, index) => (
                <Box sx={style.bubble}>
                  <Avatar variant="rounded">
                    <AccountCircleIcon />
                  </Avatar>
                  <Paper sx={style.jobCard} key={index}>
                    <Typography sx={style.jobTxt}>{msg.task}</Typography>
                  </Paper>
                </Box>
              ))}
            </>
          ) : (
            <Paper sx={style.jobCard}>
              <Box sx={style.spinnerContainer}>
                <Typography sx={style.jobTxt}>No Messages Found</Typography>
              </Box>
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default Incoming;
