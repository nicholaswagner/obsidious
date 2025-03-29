import './App.css';

import { CssBaseline } from '@mui/material';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { ObsidiousVault } from 'remark-obsidious';

import vaultData from '../src/assets/obsidious-index.json';
import { AppRouter } from './AppRouter';
import { darkTheme, lightTheme } from './AppTheme';
import { useTheme } from './AppThemeProvider';

export default function App() {
  const { themeMode } = useTheme();

  console.log(import.meta.env)

  ObsidiousVault.initialize(vaultData);
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeMode === 'light' ? lightTheme : darkTheme)}>
      <CssBaseline enableColorScheme />
      <AppRouter />
    </ThemeProvider>
  );
}
