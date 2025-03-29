import { createFileRoute } from '@tanstack/react-router';
import { ExtendedComponentProps } from '../components/MarkdownComponent/MarkdownComponents';
import { fetchVaultItemForWebPath } from '../utils/fetchVaultItemforWebPath';
import { PreviewModal } from '../components/PreviewModal';
import { usePreviewModal } from '../hooks/usePreviewModal';
import MarkdownItem from '../components/MarkdownItem';

function RouteComponent() {
  const { text } = Route.useLoaderData();
  const { preview, isVisible, handleMouseEnter, handleMouseClick } = usePreviewModal();

return (
<>
{isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
<MarkdownItem componentOverrides={{ a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />}} children={text} />
</>
);
};


export const Route = createFileRoute('/$')({
  loader: ({params}) => {
    return fetchVaultItemForWebPath(
    { webPath: `${params._splat}`})
  },
  component: RouteComponent,
});
