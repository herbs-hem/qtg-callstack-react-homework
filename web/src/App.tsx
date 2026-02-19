import { IconButton, Box, Typography, Fab } from '@mui/material';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';
import { useThemeMode } from './providers/ThemeModeContext';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useState } from 'react';
import LotteryDialog from './components/LotteryDialog';

function App() {
  const { mode, toggleColorMode } = useThemeMode();
  const [lotteryDialogOpen, setLotteryDialogOpen] = useState(false);

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant="h1">Hello Lottery App</Typography>
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
      <LotteryDialog
        open={lotteryDialogOpen}
        onClose={() => setLotteryDialogOpen(false)}
      />
    </>
  );
}

export default App;
