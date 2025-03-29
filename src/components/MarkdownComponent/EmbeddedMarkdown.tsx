
import { styled } from '@mui/material';
import { LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ObsidiousVault, slugifyFilepath } from 'remark-obsidious';

import useEmbeddedMarkdown from '../../hooks/useEmbeddedMarkdown';
import MarkdownItem from '../MarkdownItem';
import { ExtendedComponentProps } from './MarkdownComponents';
import { MarkdownLink } from './MarkdownLink';

const StyledSpan = styled('span')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100% !important',
  textAlign: 'right',
}));

const StyledEmbeddedMarkdown = styled('div')(() => ({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: `2rem`,
}));


type Props = ExtendedComponentProps & {
    fileid: string;
    hash: string;
}

const EmbeddedMarkdown = (props:Props) => {
    const {fileid, hash} = props;
    const [content, setContent] = useState({text:'', matter:{}});
    
    const result = useEmbeddedMarkdown(fileid, hash)

    useEffect(() => {
        if (result === null || result === undefined) {
            setContent({text: `
                Something went wrong while fetching embedded content.
                file-id: ${fileid}
                hash params: ${hash}`, matter:{}})
            return;
        }
        else {
            setContent(result);
        }
    }, [result, fileid, hash])

    const vaultItem = ObsidiousVault.getFileForId(fileid);
    if (!vaultItem) return null;
    const baseUrl = import.meta.env.BASE_URL;
    const url = `${baseUrl}${slugifyFilepath(vaultItem.filepath, vaultItem.extension)}` + (hash ? '#' + hash : '');

    return (
        <StyledEmbeddedMarkdown {...props} className={props.className+" toc_exclude"}>
            <StyledSpan>
                <MarkdownLink to={url}><LinkIcon /></MarkdownLink>
            </StyledSpan>
            <MarkdownItem sx={{
                padding: 0,
                margin: 0,
                '& > p:first-of-type': {
                  margin: 0,
                  padding: 0,
                  display: 'inline',
                },
            }} 
            hideToC 
            >{content.text}</MarkdownItem>

        </StyledEmbeddedMarkdown>
    )
}
// componentOverrides={{ a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />}} 

export default EmbeddedMarkdown;