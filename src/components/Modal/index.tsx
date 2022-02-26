import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ModalScreenProps {
  isOpen: boolean;
  handleClose(): void;
  content: any;
  modalHeader: string;
  modalDescription?: string;
}

const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

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
        <ModalHeader>
          <Typography variant="h3">{modalHeader}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </ModalHeader>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{modalDescription}</DialogContentText>
        {content}
      </DialogContent>
    </Dialog>
  );
};
export default ModalScreen;
