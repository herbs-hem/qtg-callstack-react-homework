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

  const nameInvalid = showValidationErrors && !lotteryName.trim();
  const prizeInvalid = showValidationErrors && !lotteryPrize.trim();

  const handleClose = () => {
    setShowValidationErrors(false);
    setLotteryName('');
    setLotteryPrize('');
    onClose();
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!lotteryName.trim() || !lotteryPrize.trim()) {
      setShowValidationErrors(true);
      return;
    }
    onClose();
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
          helperText={nameInvalid ? 'Please enter a valid name' : ''}
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
          helperText={prizeInvalid ? 'Please enter a valid prize' : ''}
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
