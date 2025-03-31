import './App.css'

import { CssBaseline } from '@mui/material'
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import { ObsidiousVault } from 'remark-obsidious'

// import vaultData from '../src/assets/obsidious-index.json'
import { AppRouter } from './AppRouter'
import { darkTheme, lightTheme } from './AppTheme'
import { useTheme } from './AppThemeProvider'

const fetchObsidiousIndex = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Error fetching index: ${response.statusText}`)
    }
    return await response.json()
}

export default function App() {
    const { themeMode } = useTheme()

    console.log(import.meta.env)

    fetchObsidiousIndex(import.meta.env.VITE_OBSIDIOUS_FILE_URL)
        .then((data) => ObsidiousVault.initialize(data))
        .catch((error) => {
            console.error('Error fetching index:', error)
            throw new Error(
                'Failed to load the index of files used for this site.  Please see the console for more information.'
            )
        })

    return (
        <ThemeProvider
            theme={responsiveFontSizes(
                themeMode === 'light' ? lightTheme : darkTheme
            )}
        >
            <CssBaseline enableColorScheme />
            <AppRouter />
        </ThemeProvider>
    )
}
