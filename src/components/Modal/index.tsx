import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

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
      <DialogTitle>{modalHeader}</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalDescription}</DialogContentText>
        {content}
      </DialogContent>
    </Dialog>
  );
};
export default ModalScreen;
