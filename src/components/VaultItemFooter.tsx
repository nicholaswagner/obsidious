import { styled } from '@mui/material'
import { useRouterState } from '@tanstack/react-router'
import { SquarePenIcon } from 'lucide-react'
import { useMemo } from 'react'
import { ObsidiousVault } from 'remark-obsidious'

import { StyledMarkdownLink } from './MarkdownComponent/MarkdownLink'

const StyledFooter = styled('footer', {
    name: 'footer',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: theme.spacing(1),

    marginTop: theme.spacing(6),
    width: '100%',
}))

const StyledEditCallout = styled('div', {
    name: 'edit-page-link',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    width: '100%',
    textTransform: 'capitalize',
}))

export const VaultIitemFooter = () => {
    const { location } = useRouterState()

    const Footer = useMemo(() => {
        const vaultPath = location.pathname.replace(
            import.meta.env.VITE_BASE_URL,
            ''
        )
        const vaultFile = ObsidiousVault.getFileForWebPathSlug(vaultPath)

        const editFileUrl = `${import.meta.env.VITE_EDIT_FILE_URL_PREFIX}/${vaultFile?.filepath}`

        return (
            <StyledFooter>
                {vaultFile && (
                    <StyledMarkdownLink
                        to={editFileUrl}
                        component="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            textDecoration: 'none',
                            width: '100%',
                        }}
                    >
                        <StyledEditCallout>
                            <SquarePenIcon
                                style={{
                                    transform: 'scale(0.5)',
                                }}
                            />{' '}
                            Edit this document
                        </StyledEditCallout>
                    </StyledMarkdownLink>
                )}
            </StyledFooter>
        )
    }, [location.pathname])

    return Footer
}
