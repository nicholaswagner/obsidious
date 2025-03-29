import { ObsidiousVault } from "remark-obsidious";
import { parseFrontmatter } from "./parseFrontmatter";

export const fetchMarkdownById = async (id: string) => {
    const fileMeta = ObsidiousVault.getFileForId(id);
    if (!fileMeta) {
        throw new Error(`This id does not have an associated file in the lookup table: ${id}`);
    }

    const prefix = `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/");

    return fetch(`${prefix}${fileMeta?.filepath}`)
        .then((res) => res.text())
        .then((text) => {
            const matter = parseFrontmatter(text);
            return { text, matter };
        })
        .catch((err) => {
            throw new Error(`Failed to fetch markdown designed in hash from cdn prefix`, err);
        });
} 