import { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { green } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { sendMessage } from 'src/store/actions/msg.action';

interface JobScheduleProps {
  workerId: string | number;
  messageType: 'MESSAGE' | 'TODO' | 'NOTIFICATION';
}
const style: any = {
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '80px',
    display: 'flex',
    minWidth: '400px',
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
  }
};

const WorkerJobSchedule = ({ workerId, messageType }: JobScheduleProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const buttonSx = {
    width: '100%',
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700]
      }
    })
  };

  const handleMessageSend = () => {
    if (message == '') {
      setError('Message is required*');
    } else {
      setError('');
      dispatch(sendMessage({ user_id: workerId, message }));
      setMessage('');
    }
  };

  return (
    <Paper sx={style.jobCard}>
      <Box sx={style.messageContainer}>
        <TextField
          id="outlined-multiline-static"
          label="Enter your message here"
          multiline
          rows={5}
          sx={style.textArea}
          onChange={(event: any) => setMessage(event.target.value)}
          error={Boolean(error)}
          helperText={Boolean(error) && error}
          value={message}
        />
        <Box sx={style.btnContainer}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleMessageSend}
            endIcon={<SendIcon />}
          >
            Send Message
          </Button>
          {loading && <CircularProgress size={24} sx={style.buttonSpinner} />}
        </Box>
      </Box>
    </Paper>
  );
};

export default WorkerJobSchedule;
