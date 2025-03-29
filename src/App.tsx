import './App.css';

import { CssBaseline } from '@mui/material';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import { AppRouter } from './AppRouter';
import { darkTheme, lightTheme } from './AppTheme';
import { useTheme } from './AppThemeProvider';

import { ObsidiousVault } from 'remark-obsidious';
import vaultData from '../src/assets/obsidious-index.json';

export default function App() {
  const { themeMode } = useTheme();

  console.log({
    BASE_URL: import.meta.env.BASE_URL,
    VITE_FILEPATH_PREFIX: import.meta.env.VITE_FILEPATH_PREFIX,
  });

  ObsidiousVault.initialize(vaultData);
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeMode === 'light' ? lightTheme : darkTheme)}>
      <CssBaseline enableColorScheme />
      <AppRouter />
    </ThemeProvider>
  );
}
