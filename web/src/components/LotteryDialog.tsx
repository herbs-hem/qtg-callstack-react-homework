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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a new lottery</DialogTitle>
      <DialogContent>
        <TextField
          label="Lottery Name"
          fullWidth
          onChange={(e) => setLotteryName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Lottery Prize"
          fullWidth
          onChange={(e) => setLotteryPrize(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}
