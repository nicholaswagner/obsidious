import { useEffect, useMemo, useState } from "react";

import extractMarkdownHeaderContent from "../utils/extractMarkdownHeaderContent";
import { fetchMarkdownById } from "../utils/fetchMarkdownById"

export type EmbeddedMarkdownResult = { text: string, matter: Record<string, string> } | null;

const useEmbeddedMarkdown = (fileId: string, hashSlug: string): EmbeddedMarkdownResult => {
    const memoizedData = useMemo(() => fetchMarkdownById(fileId), [fileId]);

    const [result, setResult] = useState<EmbeddedMarkdownResult>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { text: rawText, matter } = await memoizedData;
            const processedResult = hashSlug === '' ? rawText : extractMarkdownHeaderContent(rawText, hashSlug);
            setResult({ text: processedResult || '', matter: matter as Record<string, string> });
        };

        fetchData();
    }, [memoizedData, hashSlug]);

    return result;
};

export default useEmbeddedMarkdown;