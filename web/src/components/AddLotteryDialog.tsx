import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  DialogActions,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

type LotteryDialogProps = {
  open: boolean;
  onClose: () => void;
  createNewLottery: (
    lotteryName: string,
    lotteryPrize: string,
  ) => Promise<void>;
  isAdding: boolean;
  error: string | null;
};

const lotterySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters'),
  prize: Yup.string()
    .required('Prize is required')
    .min(4, 'Prize must be at least 4 characters'),
});

export default function AddLotteryDialog({
  open,
  onClose,
  createNewLottery,
  isAdding,
  error,
}: Readonly<LotteryDialogProps>) {
  const [openAddLotteryNotification, setOpenAddLotteryNotification] =
    useState(false);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      prize: '',
    },
    validationSchema: lotterySchema,
    validateOnChange: true,
    onSubmit: (values) => {
      createNewLottery(values.name, values.prize)
        .then(() => {
          setOpenAddLotteryNotification(true);
          handleClose();
        })
        .catch(() => {});
    },
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a new lottery</DialogTitle>
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
            <TextField
              variant="standard"
              label="Lottery Prize"
              fullWidth
              required
              name="prize"
              value={formik.values.prize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.prize && formik.touched.prize)}
              helperText={formik.touched.prize && formik.errors.prize}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: 'flex-start', gap: 2, px: 3, pb: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              aria-disabled={!formik.isValid || isAdding}
              startIcon={
                isAdding ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {isAdding ? 'Adding...' : 'Add'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={openAddLotteryNotification}
        onClose={() => setOpenAddLotteryNotification(false)}
        message="New Lottery added successfully"
        autoHideDuration={3000}
      />
    </>
  );
}
