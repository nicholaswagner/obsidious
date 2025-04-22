import { Breadcrumbs as MuiBreadcrumbs, Link, styled } from '@mui/material'
import { useLocation } from '@tanstack/react-router'
import { ObsidiousVault, slugifyFilepath } from 'remark-obsidious'

const DisabledCrumb = styled(Link)(({ theme }) => ({
    cursor: 'default',
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
}))

export const Breadcrumbs = () => {
    const { pathname } = useLocation()
    const crumbs = pathname.split('/').map((slug) => {
        if (slug === '') return

        const vaultItem = ObsidiousVault.getFileForLabelSlug(slug)

        if (vaultItem?.fileType === 'file') {
            return (
                <Link
                    key={vaultItem.id}
                    href={`/${slugifyFilepath(vaultItem.filepath, vaultItem.extension)}`}
                    aria-label={vaultItem.label}
                    underline="hover"
                >
                    {vaultItem.label}
                </Link>
            )
        } else {
            if (vaultItem)
                return (
                    <DisabledCrumb key={vaultItem.id}>
                        {vaultItem.label}
                    </DisabledCrumb>
                )
            else return <DisabledCrumb key={slug}>slug</DisabledCrumb>
        }
    })

    return (
        <MuiBreadcrumbs
            sx={{ marginBottom: '2rem', textTransform: 'capitalize' }}
            separator="/"
        >
            {crumbs}
        </MuiBreadcrumbs>
    )
}
