import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

type LotteryDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function LotteryDialog({ open, onClose }: LotteryDialogProps) {
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const nameInvalid =
    showValidationErrors &&
    (!lotteryName.trim() || lotteryName.trim().length < 4);
  const prizeInvalid =
    showValidationErrors &&
    (!lotteryPrize.trim() || lotteryPrize.trim().length < 4);

  let nameErrorMessage = '';
  if (nameInvalid) {
    nameErrorMessage =
      lotteryName.trim() === ''
        ? 'Name is required'
        : 'Name must be at least 4 characters';
  }

  let prizeErrorMessage = '';
  if (prizeInvalid) {
    prizeErrorMessage =
      lotteryPrize.trim() === ''
        ? 'Prize is required'
        : 'Prize must be at least 4 characters';
  }

  const handleClose = () => {
    setShowValidationErrors(false);
    setLotteryName('');
    setLotteryPrize('');
    onClose();
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nameValid = lotteryName.trim().length >= 4;
    const prizeValid = lotteryPrize.trim().length >= 4;
    if (!nameValid || !prizeValid) {
      setShowValidationErrors(true);
      return;
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new lottery</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          label="Lottery Name"
          fullWidth
          required
          value={lotteryName}
          onChange={(e) => setLotteryName(e.target.value)}
          error={nameInvalid}
          helperText={nameErrorMessage}
          sx={{ mt: 2 }}
        />
        <TextField
          variant="standard"
          label="Lottery Prize"
          fullWidth
          required
          value={lotteryPrize}
          onChange={(e) => setLotteryPrize(e.target.value)}
          error={prizeInvalid}
          helperText={prizeErrorMessage}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleAdd}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}
