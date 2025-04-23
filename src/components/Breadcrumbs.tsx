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
                const prefix = `${import.meta.env.BASE_URL}`
                const src =
                    `${prefix}${slugifyFilepath(vaultItem.filepath, vaultItem.extension)}`.replace(
                        /\/\//g,
                        '/'
                    )
                return (
                    <Link
                        key={vaultItem.id}
                        href={src}
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
