import { IconButton, Box, Fab } from '@mui/material';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';
import { useThemeMode } from './providers/ThemeModeContext';
import './App.css';
import { useEffect, useState } from 'react';
import AddLotteryDialog from './components/AddLotteryDialog';
import { useLottery } from './hooks/useLottery';
import Lotteries from './components/Lotteries';
import { useLotteries } from './hooks/useLotteries';
import RegisterLotteryDialog from './components/RegisterLotteryDialog';
import { useRegisterLottery } from './hooks/useRegisterLottery';

function App() {
  const { mode, toggleColorMode } = useThemeMode();
  const [lotteryDialogOpen, setLotteryDialogOpen] = useState(false);
  const { createNewLottery, isAdding, lottery, resetLottery, errorMessage } =
    useLottery();
  const [selectedLotteries, setSelectedLotteries] = useState<string[]>([]);
  const { lotteries, loading, refetch: refetchLotteries } = useLotteries();
  const [registerLotteryDialogOpen, setRegisterLotteryDialogOpen] =
    useState(false);
  const {
    registerLottery,
    isRegistering,
    registerErrorMessage,
    resetRegisterLottery,
  } = useRegisterLottery();

  useEffect(() => {
    if (lottery) {
      setTimeout(() => {
        setLotteryDialogOpen(false);
      }, 1000);
    }
  }, [lottery]);

  const closeLotteryDialog = () => {
    setLotteryDialogOpen(false);
    resetLottery();
  };

  const closeRegisterLotteryDialog = () => {
    setRegisterLotteryDialogOpen(false);
    resetRegisterLottery();
  };

  const handleSelectLottery = (id: string) => {
    setSelectedLotteries((lotteries) => {
      if (lotteries.includes(id)) {
        return lotteries.filter((lottery) => lottery !== id);
      }
      return [...lotteries, id];
    });
  };

  const handleRegisterLottery = () => {
    setRegisterLotteryDialogOpen(true);
  };

  const createNewLotteryAndRefetch = async (name: string, prize: string) => {
    await createNewLottery(name, prize);
    await refetchLotteries();
  };

  return (
    <>
      <Box sx={{ position: 'fixed', top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          aria-label="toggle theme"
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Lotteries
          loading={loading}
          hasLotteries={lotteries.length > 0}
          lotteries={lotteries}
          selectedLotteries={selectedLotteries}
          onSelectLottery={handleSelectLottery}
        />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          right: (theme) => theme.spacing(2),
          bottom: (theme) => theme.spacing(2),
          zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <Fab
          variant="extended"
          aria-label="register"
          onClick={handleRegisterLottery}
          disabled={selectedLotteries.length === 0}
        >
          Register
        </Fab>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add lottery"
          onClick={() => setLotteryDialogOpen(true)}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Lottery
        </Fab>
      </Box>
      <AddLotteryDialog
        open={lotteryDialogOpen}
        onClose={closeLotteryDialog}
        createNewLottery={createNewLotteryAndRefetch}
        isAdding={isAdding}
        error={errorMessage}
      />
      <RegisterLotteryDialog
        open={registerLotteryDialogOpen}
        onClose={closeRegisterLotteryDialog}
        registerLottery={registerLottery}
        isRegistering={isRegistering}
        error={registerErrorMessage}
        selectedLotteries={selectedLotteries}
      />
    </>
  );
}

export default App;
