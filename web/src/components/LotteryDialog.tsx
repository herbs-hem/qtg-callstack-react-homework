import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import * as LotteryService from '../services/lottery';

type LotteryDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function LotteryDialog({
  open,
  onClose,
}: Readonly<LotteryDialogProps>) {
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

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

  const handleAdd = async () => {
    const nameValid = lotteryName.trim().length >= 4;
    const prizeValid = lotteryPrize.trim().length >= 4;

    if (!nameValid || !prizeValid) {
      setShowValidationErrors(true);
      return;
    }
    setIsAdding(true);
    try {
      const lottery = await LotteryService.addLottery(
        lotteryName,
        lotteryPrize,
      );

      // Simulate a delay to test the loading state
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(lottery);
      handleClose();
      setOpenNotification(true);
    } catch {
      setShowValidationErrors(true);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
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
            disabled={isAdding}
            startIcon={
              isAdding ? <CircularProgress size={20} color="inherit" /> : null
            }
            onClick={() => handleAdd()}
            sx={{ mt: 2 }}
          >
            {isAdding ? 'Adding...' : 'Add'}
          </Button>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        message="New Lottery added successfully"
        autoHideDuration={3000}
      />
    </>
  );
}
