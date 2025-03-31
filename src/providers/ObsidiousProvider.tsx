import { Container } from '@mui/material'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { ObsidiousVault } from 'remark-obsidious'

import CircularIndeterminate from '../components/CircularIndeterminateProgress'

const ObsidiousContext = createContext<{ vault: typeof ObsidiousVault | null }>(
    { vault: null }
)

export function ObsidiousProvider({ children }: { children: ReactNode }) {
    const [vault, setVault] = useState<typeof ObsidiousVault | null>(null)

    useEffect(() => {
        async function loadVault() {
            const response = await fetch(
                `${import.meta.env.VITE_OBSIDIOUS_FILE_URL}`
            )
            const data = await response.json()
            setVault(ObsidiousVault.initialize(data))
        }
        loadVault()
    }, [])

    if (!vault)
        return (
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularIndeterminate />
            </Container>
        )

    return (
        <ObsidiousContext.Provider value={{ vault }}>
            {children}
        </ObsidiousContext.Provider>
    )
}

export function useVault() {
    return useContext(ObsidiousContext)
}
