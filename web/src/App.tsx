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

function App() {
  const { mode, toggleColorMode } = useThemeMode();
  const [lotteryDialogOpen, setLotteryDialogOpen] = useState(false);
  const { createNewLottery, isAdding, lottery, resetLottery, errorMessage } =
    useLottery();
  const [selectedLotteries, setSelectedLotteries] = useState<string[]>([]);
  const { lotteries, loading } = useLotteries();

  useEffect(() => {
    if (lottery) {
      setTimeout(() => {
        setLotteryDialogOpen(false);
      }, 1000);
    }
  }, [lottery]);

  const CloseLotteryDialog = () => {
    setLotteryDialogOpen(false);
    resetLottery();
  };

  const handleSelectLottery = (id: string) => {
    setSelectedLotteries((lotteries) => {
      if (lotteries.includes(id)) {
        return lotteries.filter((lottery) => lottery !== id);
      }
      return [...lotteries, id];
    });
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
      <Fab
        variant="extended"
        color="primary"
        aria-label="add lottery"
        onClick={() => setLotteryDialogOpen(true)}
        sx={{
          position: 'fixed',
          textAlign: 'center',
          right: (theme) => theme.spacing(2),
          bottom: (theme) => theme.spacing(2),
          zIndex: 1,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Lottery
      </Fab>
      <AddLotteryDialog
        open={lotteryDialogOpen}
        onClose={CloseLotteryDialog}
        createNewLottery={createNewLottery}
        isAdding={isAdding}
        error={errorMessage}
      />
    </>
  );
}

export default App;
