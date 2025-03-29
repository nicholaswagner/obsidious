import { Box,styled, SxProps } from "@mui/material";
import { useMemo } from "react";
import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { ObsidiousVault, remarkObsidious, slugify } from 'remark-obsidious';

import { MarkdownComponents } from "./MarkdownComponent/MarkdownComponents";
import { TableOfContents } from "./TableOfContents";

const StyledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    width: '100%',
});

const StyledMarkdown = styled('article')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
}));



type Props = {
    children: string | null | undefined;
    componentOverrides?: typeof MarkdownComponents;
    hideToC?: boolean;
    sx?: SxProps;
}

const MarkdownItem = ({children,componentOverrides, hideToC, sx}:Props) => {
    const className = 'md-items';

    const options:Options = useMemo(() => ({
        className,
        remarkPlugins: [
            remarkGfm, 
            [remarkObsidious,{
                basePath: import.meta.env.BASE_URL, 
                filePathPrefix: `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/"),            
                getFileMetaForLabel: (label: string) => ObsidiousVault.getFileForLabelSlug(slugify(label)) 
            }]],
        components: {
            ...MarkdownComponents,
            ...componentOverrides
        },
        children,
      }), [children, componentOverrides]);
    
    const elements = MarkdownHooks(options);
    const tableOfContents = useMemo(() => hideToC ? null : (<TableOfContents targetClassName={className} />), [hideToC]);
    
    return (
        <StyledContainer sx={sx}>
        <StyledMarkdown>{elements}</StyledMarkdown>
           {tableOfContents}
        </StyledContainer>
    )
}

export default MarkdownItem;