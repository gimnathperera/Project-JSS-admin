import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalScreenProps {
  isOpen: boolean;
  handleClose(): void;
  content: any;
}

const ModalScreen = ({ isOpen, handleClose, content }: ModalScreenProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add new worker</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        {content}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions> */}
    </Dialog>
  );
};
export default ModalScreen;
