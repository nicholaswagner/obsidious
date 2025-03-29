import { useMemo } from "react";
import extractMarkdownHeaderContent from "../utils/extractMarkdownHeaderContent";
import { fetchMarkdownById } from "../utils/fetchMarkdownById"


const useEmbeddedMarkdown = async (fileId: string, hashSlug: string) => {

    const memoizedData = useMemo(() => fetchMarkdownById(fileId), [fileId]);

    const { text } = await memoizedData;

    const result = hashSlug === '' ? text : extractMarkdownHeaderContent(text, hashSlug);

    return result;
}

export default useEmbeddedMarkdown;