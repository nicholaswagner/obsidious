import { ObsidiousVault, ObsidiousVaultImageFiletypes, ObsidiousVaultItem, slugify } from "remark-obsidious";

import { parseFrontmatter } from "./parseFrontmatter";

const EMBEDDABLE_TYPES = new Set(['md', ...ObsidiousVaultImageFiletypes]);
const CODEBLOCK_TYPES = new Set(['json', 'xml', 'log', 'yaml', 'yml']);
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

const renderAsCodeblock = (vaultItem: ObsidiousVaultItem, text: string) => `
### ${vaultItem.label}
\`\`\`${vaultItem.extension}
${text}
\`\`\`
`;

type FetchVaultItemForWebPathResult = {
    text: string | null;
    matter: Record<string, string>;
}

export const fetchVaultItemForWebPath = async ({ webPath }: Args): Promise<FetchVaultItemForWebPathResult> => {
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

    if (CODEBLOCK_TYPES.has(vaultItem.extension)) {
        return fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const matter = { layout: 'code', hideToC: 'true' }
                return { text: renderAsCodeblock(vaultItem, text), matter };
            })
            .catch((err) => {
                throw new Error(`Failed to fetch ${vaultItem.extension}`, err);
            });
    }

    if (vaultItem.extension === "md") {
        return fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const parsedMatter = parseFrontmatter(text);
                const matter = Object.fromEntries(
                    Object.entries(parsedMatter).filter(([_, value]) => value !== undefined)
                ) as Record<string, string>;
                return { text, matter };
            })
            .catch((err) => {
                throw new Error(`Failed to fetch markdown`, err);
            });
    }
    else if (EMBEDDABLE_TYPES.has(vaultItem.extension)) {
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