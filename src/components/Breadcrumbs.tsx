import { Breadcrumbs as MuiBreadcrumbs, Link, styled } from '@mui/material'
import { useLocation } from '@tanstack/react-router'
import { ObsidiousVault, slugifyFilepath } from 'remark-obsidious'

const DisabledCrumb = styled(Link)(() => ({
    cursor: 'default',
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
}))

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(() => ({
    // marginBottom: '2rem',
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    ol: {
        flexDirection: 'row !important',
    },
    marginTop: '4rem',
}))

export const Breadcrumbs = () => {
    const { pathname } = useLocation()
    const crumbs = pathname
        .replace(import.meta.env.VITE_BASE_URL, '')
        .split('/')
        .map((slug) => {
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
                else return <DisabledCrumb key={slug}>{slug}</DisabledCrumb>
            }
        })

    return <StyledBreadcrumbs separator="/">{crumbs}</StyledBreadcrumbs>
}
