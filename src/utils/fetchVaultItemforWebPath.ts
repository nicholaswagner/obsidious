import { ObsidiousVault, ObsidiousVaultItem, ObsidiousVaultImageFiletypes, slugify } from "remark-obsidious";
import { parseFrontmatter } from "./parseFrontmatter";

const SUPPORTED_FILETYPES = new Set(['md', ...ObsidiousVaultImageFiletypes]);

interface Args {
    webPath: string;
}

const notSupportedMessage = (vaultItem: ObsidiousVaultItem) => `
> [!bug] Viewing vaultfile by webpath in this context is not yet supported.
I need to add support for it... details below
\`\`\`json
${JSON.stringify(vaultItem, null, 2)}
\`\`\`

`

export const fetchVaultItemForWebPath = async ({ webPath }: Args) => {
    const vaultItem = ObsidiousVault.getFileForWebPathSlug(webPath);

    if (!vaultItem)
        throw new Error(`ObsidianVault was unable to find a VaultItemID for: ${webPath}`);

    if (vaultItem.fileType !== 'file')
        throw new Error(`requested vaultitem for ${webPath} is not a 'file' and can not be fetched`);

    if (!vaultItem.extension) {
        throw new Error(`vaultItem for ${webPath} either does not have an extension or is not supported: ${vaultItem.extension}`);
    }

    const prefix = `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`;
    const src = `${prefix}${vaultItem?.filepath}`.replace(/\/\//g, "/");


    if (vaultItem.extension === "md") {
        return fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const matter = parseFrontmatter(text);
                return { text, matter };
            })
            .catch((err) => {
                throw new Error(`Failed to fetch markdown designed in hash from cdn prefix`, err);
            });
    }
    else if (SUPPORTED_FILETYPES.has(vaultItem.extension)) {
        const text = `
![[${slugify(vaultItem.label)}]]
\`\`\`json
${JSON.stringify(vaultItem, null, 2)}
\`\`\`
`;
        return { text, matter: {} };
    }
    else {
        return { text: notSupportedMessage(vaultItem), matter: {} };
    }
}; 