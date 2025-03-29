import { styled } from '@mui/material';
import { ImgHTMLAttributes } from 'react';


type MarkdownImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  'data-label'?: string;
  'data-meta'?: string;
};

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
}));


export const MarkdownImage = (props: MarkdownImageProps) => {
  const {
    'data-label': _label,
    'data-meta': meta,
    className,
    src,
  } = props;

  return (
    <StyledImageBox>
      <img
        className={`${className} ${meta}`}
        src={src}
      />
    </StyledImageBox>
  );
};
