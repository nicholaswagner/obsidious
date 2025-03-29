import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { remarkObsidious, ObsidiousVault, slugify } from 'remark-obsidious';
import { MarkdownComponents } from "./MarkdownComponent/MarkdownComponents";
import { useMemo } from "react";
import { TableOfContents } from "./TableOfContents";
import { styled, SxProps,Box } from "@mui/material";

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
    hideToc?: boolean;
    sx?: SxProps;
}

const MarkdownItem = ({children,componentOverrides, hideToc, sx}:Props) => {
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
      }), [children]);
    
    const elements = MarkdownHooks(options);
    
    const tableOfContents = useMemo(() => hideToc ? null : (<TableOfContents targetClassName={className} />), [elements, hideToc]);
    
    return (
        <StyledContainer sx={sx}>
        <StyledMarkdown>{elements}</StyledMarkdown>
           {tableOfContents}
        </StyledContainer>
    )
}

export default MarkdownItem;