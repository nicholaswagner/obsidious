import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { ExtendedComponentProps } from '../components/MarkdownComponent/MarkdownComponents'
import MarkdownItem from '../components/MarkdownItem'
import { PreviewModal } from '../components/PreviewModal'
import { usePreviewModal } from '../hooks/usePreviewModal'
import { fetchVaultItemForWebPath } from '../utils/fetchVaultItemforWebPath'

function RouteComponent() {
    const { text, matter } = Route.useLoaderData()
    const { preview, isVisible, handleMouseEnter, handleMouseClick } =
        usePreviewModal()
    const options = { layout: 'default', hideToC: false, ...matter }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {isVisible && (
                <PreviewModal {...preview} onClick={handleMouseClick} />
            )}
            <MarkdownItem
                sx={{
                    marginTop: '4rem',
                    marginBottom: '20rem',
                }}
                hideToC={options.hideToC}
                componentOverrides={{
                    a: (props: ExtendedComponentProps) => (
                        <a {...props} onMouseEnter={handleMouseEnter} />
                    ),
                }}
            >
                {text}
            </MarkdownItem>
        </Box>
    )
}

export const Route = createFileRoute('/$')({
    loader: ({ params }) => {
        return fetchVaultItemForWebPath({ webPath: `${params._splat}` })
    },
    component: RouteComponent,
})
