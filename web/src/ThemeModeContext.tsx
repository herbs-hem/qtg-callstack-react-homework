import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

type PaletteMode = 'light' | 'dark';

type ThemeModeContextValue = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

export function useThemeMode(): ThemeModeContextValue {
  const value = useContext(ThemeModeContext);
  if (value === undefined) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return value;
}

type ThemeModeProviderProps = {
  children: React.ReactNode;
};

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
