import './App.css'

import { CssBaseline } from '@mui/material'
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles'

import { AppRouter } from './AppRouter'
import { darkTheme, lightTheme } from './AppTheme'
import { useTheme } from './AppThemeProvider'
import { ObsidiousProvider } from './providers/ObsidiousProvider'

export default function App() {
    const { themeMode } = useTheme()

    console.log(import.meta.env)

    return (
        <ThemeProvider
            theme={responsiveFontSizes(
                themeMode === 'light' ? lightTheme : darkTheme
            )}
        >
            <CssBaseline enableColorScheme />
            <ObsidiousProvider>
                <AppRouter />
            </ObsidiousProvider>
        </ThemeProvider>
    )
}
