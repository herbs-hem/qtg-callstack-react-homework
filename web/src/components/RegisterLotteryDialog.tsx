import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

type RegisterLotteryDialogProps = {
  open: boolean;
  onClose: () => void;
  registerLottery: (name: string, lotteries: string[]) => Promise<void>;
  isRegistering: boolean;
  error: string | null;
  selectedLotteries: string[];
};

const registerLotterySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters'),
});

export default function RegisterLotteryDialog({
  open,
  onClose,
  registerLottery,
  isRegistering,
  error,
  selectedLotteries,
}: RegisterLotteryDialogProps) {
  const [openRegisterLotteryNotification, setOpenRegisterLotteryNotification] =
    useState(false);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: registerLotterySchema,
    validateOnChange: true,
    onSubmit: (values) => {
      registerLottery(values.name, selectedLotteries)
        .then(() => {
          setOpenRegisterLotteryNotification(true);
          handleClose();
        })
        .catch(() => {});
    },
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Register for a lottery</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              variant="standard"
              label="Lottery Name"
              fullWidth
              required
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: 'flex-start', gap: 2, px: 3, pb: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              aria-disabled={!formik.isValid || isRegistering}
              startIcon={
                isRegistering ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={openRegisterLotteryNotification}
        onClose={() => setOpenRegisterLotteryNotification(false)}
        message="Lottery registered successfully"
        autoHideDuration={3000}
      />
    </>
  );
}
