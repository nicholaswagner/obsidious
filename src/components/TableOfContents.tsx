import { List, ListItem, ListItemProps, ListProps, styled } from '@mui/material';
import { useParams} from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { SIDEBAR_WIDTH } from '../AppConstants';
import useActiveHeading from '../hooks/useActiveHeading';
import { slugify } from 'remark-obsidious';
import { buildToC, TocData } from '../utils/buildToc';
import { MarkdownLink } from './MarkdownComponent/MarkdownLink';

const StyledToC = styled('nav')(() => ({
  display: 'flex',
  alignItems: 'left',
  flexShrink: 2,
  position: 'sticky',
  top: 90,
  height: 'auto',
  maxHeight: 'calc(100vh - 90px)',
  overflowY: 'scroll',
  padding: 0,
  flexDirection: 'column',
}));

const StyledUL = styled(List)<ListProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: 0,
  padding: 0,
}));

const StyledLI = styled(ListItem)<ListItemProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
}));

const StyledToCLink = styled(MarkdownLink)(({ theme }) => ({
  textDecoration: 'none',
  justifyContent: 'start',
  borderRadius: 0,
  margin: 0,
  padding: '0.5rem',
  wordBreak: 'unset',
  fontSize: '1rem',
  textTransform: 'capitalize',
  textAlign: 'left',
  width: '100%',
  marginLeft: '0.1rem',
  borderLeft: `0.1rem solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  transition: 'color 0.2s, border-left 0.2s',
  ['&.visible']: {
    borderLeft: '0.25rem solid var(--palette-primary-main)',
    color: theme.palette.text.primary,
    marginLeft: 0,
  },
}));


type Props = {
  targetClassName?: string;
}

export const TableOfContents = ({targetClassName = 'md'}:Props) => {
  const [headings, setHeadings] = useState<TocData[]>([]);
  const params = useParams({ strict: false });
  const data = buildToC(headings);
  const {activeId} = useActiveHeading();

    const querySelectHeadings = () => {
    const markdownContainer = document.querySelector(`.${targetClassName}`) as HTMLElement;
    if (!markdownContainer) return [];
    return (
      Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter((node) => node.closest('.toc_exclude') === null)
      .map((node) => {
        const id = slugify(node.textContent ?? '');
        node.id = id;
        return {
          children: [],
          id,
          level: parseInt(node.tagName.substring(1)),
          text: node.textContent?.trim() ?? '',
        };
      }));
};

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeadings(querySelectHeadings());
    }, 150); // Adjust timing based on rendering behavior
  
    return () => clearTimeout(timeout);
  }, [params]);


  const TableOfContentsItems = ({ data }: { data: TocData[] }) => (
    <StyledUL component="ul" dense disablePadding>
      {data.map((item, index) => (
        <StyledLI key={`${item.id}_${index}`} data-level={item.level} disableGutters disablePadding>
          <StyledToCLink
            key={`${item.id}${index}`}
            id={`${item.id}_${index}_link`}
            to={`/$`}
            activeOptions={{ includeHash: true }}
            hashScrollIntoView={true}
            hash={item.id}
            className={`${activeId === item.id ? 'active' : ''} ${activeId === item.id ? 'visible' : ''}`}
          >
            {item.text}
          </StyledToCLink>
          {item.children.length > 0 && (
            <StyledUL key={`${item.id}_${index}_ul`} component="ul" dense disablePadding>
              <TableOfContentsItems data={item.children} />
            </StyledUL>
          )}
        </StyledLI>
      ))}
    </StyledUL>
  );

  return (
    <StyledToC aria-label="table of contents" sx={{ width: data.length ? SIDEBAR_WIDTH : 0 }}>
      <TableOfContentsItems data={data} />
    </StyledToC>
  );
};
