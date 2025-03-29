
import { LinkIcon } from 'lucide-react';
import { styled } from '@mui/material';
import { useState } from 'react';
// import Markdown from '../Markdown';
import useEmbeddedMarkdown from '../../hooks/useEmbeddedMarkdown';
import { ObsidiousVault, slugifyFilepath } from 'remark-obsidious';
import { ExtendedComponentProps } from './MarkdownComponents';
import { MarkdownLink } from './MarkdownLink';
import MarkdownItem from '../MarkdownItem';

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
    const [content, setContent] = useState('loading...');
    
    useEmbeddedMarkdown(fileid, hash).then((text) => {
        if (!text) {
            setContent(`
                Something went wrong while fetching embedded content.
                file-id: ${fileid}
                hash params: ${hash}`);
            return
        }
        setContent(text)
    });

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
            hideToc 
            children={content} />

        </StyledEmbeddedMarkdown>
    )
}
// componentOverrides={{ a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />}} 

export default EmbeddedMarkdown;