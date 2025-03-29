import { createFileRoute } from '@tanstack/react-router';
import MarkdownItem from '../components/MarkdownItem';
import { usePreviewModal } from '../hooks/usePreviewModal';
import { PreviewModal } from '../components/PreviewModal';
import { ExtendedComponentProps } from '../components/MarkdownComponent/MarkdownComponents';
import { fetchVaultItemForWebPath } from '../utils/fetchVaultItemforWebPath';

const RouteComponent = () => {
  const { text } = Route.useLoaderData();
  const { preview, isVisible, handleMouseEnter, handleMouseClick } = usePreviewModal();

  return (
    <>
        {isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
        <MarkdownItem componentOverrides={{ a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />}} children={text} />
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