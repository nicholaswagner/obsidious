import { styled } from '@mui/material'
import { ImgHTMLAttributes } from 'react'

type MarkdownImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    'data-label'?: string
    'data-meta'?: string
}

type MarkdownImageStyleMeta =
    | { type: 'size'; width: string; height: string }
    | { type: 'class'; className: string }

// This is just laying the groundwork for applying a global filter to the images, just haven't decided on what i want yet.
const StyledImageBox = styled('span')(() => ({
    margin: 0,
    padding: 0,
    display: 'inline-block',
    position: 'relative',
    lineHeight: 0,
    ['&::after']: {
        content: `'""'`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        mixBlendMode: 'overlay',
        background: 'rgb(255, 181, 91)',
        opacity: 0.1,
    },
    ['& > img']: {
        filter: 'brightness(100%) contrast(120%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(10%)',
        mixBlendMode: 'normal',
    },
}))

/** This is to support embed image dimensions: https://help.obsidian.md/embeds */
function parseMeta(meta: string): MarkdownImageStyleMeta {
    const sizeMatch = /^(\d+)(?:x(\d+))?$/.exec(meta.trim())

    if (sizeMatch) {
        const width = parseInt(sizeMatch[1], 10)
        const height = sizeMatch[2] ? parseInt(sizeMatch[2], 10) : 'auto'
        return { type: 'size', width: `${width}px`, height: `${height}px` }
    }

    return { type: 'class', className: meta.trim() }
}

const SizedImage = styled('img')<{ width: string; height: string }>(
    ({ width, height }) => ({
        width,
        height,
    })
)

export const MarkdownImage = (props: MarkdownImageProps) => {
    const { 'data-label': _label, 'data-meta': meta, src } = props

    const options = parseMeta(meta || '')

    return (
        <StyledImageBox>
            {options.type === 'size' ? (
                <SizedImage
                    src={src}
                    width={options.width}
                    height={options.height}
                />
            ) : (
                <img src={src} className={`${options.className}`} />
            )}
        </StyledImageBox>
    )
}
