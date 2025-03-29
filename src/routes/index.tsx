import { createFileRoute } from '@tanstack/react-router';

import { ExtendedComponentProps } from '../components/MarkdownComponent/MarkdownComponents';
import MarkdownItem from '../components/MarkdownItem';
import { PreviewModal } from '../components/PreviewModal';
import { usePreviewModal } from '../hooks/usePreviewModal';
import { fetchVaultItemForWebPath } from '../utils/fetchVaultItemforWebPath';

const RouteComponent = () => {
  const { text, matter } = Route.useLoaderData();
  const { preview, isVisible, handleMouseEnter, handleMouseClick } = usePreviewModal();
  const options = {layout: 'default', hideToC: false, ...matter};
  console.log('matter: ', matter);
  return (
    <>
        {isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
        <MarkdownItem hideToC={options.hideToC} componentOverrides={{ a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />}}>{text}</MarkdownItem>
    </>
  );
};


export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => {
    return fetchVaultItemForWebPath(
    { webPath: `${import.meta.env.VITE_INITIAL_VAULT_FILE_LABEL_SLUG}`})
  },
  notFoundComponent: () => <h1>404</h1>,
});