import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

interface ModalScreenProps {
  isOpen: boolean;
  handleClose(): void;
  content: any;
  modalHeader: string;
  modalDescription?: string;
}

const ModalScreen = ({
  isOpen,
  handleClose,
  content,
  modalHeader,
  modalDescription
}: ModalScreenProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h3">{modalHeader}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{modalDescription}</DialogContentText>
        {content}
      </DialogContent>
    </Dialog>
  );
};
export default ModalScreen;
